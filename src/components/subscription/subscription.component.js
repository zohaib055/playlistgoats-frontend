import React, { Component } from "react";
import UserService from "../../services/user.service";
import Cards from "react-credit-cards";
import ReactInputMask from "react-input-mask";
import authService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment'

const required = (value,) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


const validateCardDetails = (cardNumber, expiry, cvc) => {
    // Check if the card number is valid
    if (cardNumber.split(' ').join('').length !== 16) {
        return false;
    }

    // Check if the expiry date is in MM/YY format
    if (expiry?.split('/')?.[0]?.length !== 2 || expiry?.split('/')?.[1]?.length !== 2) {
        return false;
    }

    // Check if the CVV is a three-digit number
    if (!/^\d{3}$/.test(cvc)) {
        return false;
    }
    return true

}

export default class Subscription extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            component: "subscription",
            showEditCardForm: false,
            loading: false,
            cvc: "",
            expiry: "",
            number: "",
            existingCard: {
                last4: '****',
                exp_month: '**',
                exp_year: '**',
                cvv: "***"
            },
            subscriptionDetails: null,
            noActiveCard: true,
            subscriptionLoader: false,
            fetchingCardDetails: false,
            fetchingSubscriptionDetails: false
        };
    }
    componentDidMount() {
        if(authService.getCurrentUser()) {
            this.getCardDetails()
            this.getSubscriptionDetails()
        }
    }
    getCardDetails() {
        try {
            this.setState({ fetchingCardDetails: true })
            authService.getCards().then((response) => {
                if (!response?.data?.notExist) {
                    const cardDetails = response?.data?.cardDetails;
                    this.setState({
                        ...this.state,
                        existingCard: {
                            last4: cardDetails?.last4,
                            exp_month: cardDetails?.exp_month,
                            exp_year: cardDetails?.exp_year
                        },
                        noActiveCard: false,
                        fetchingCardDetails: false
                    })
                }

            }).catch((e) => {
                this.setState({ fetchingCardDetails: false })
                throw e;
            })
        } catch (e) {
            this.setState({ fetchingCardDetails: false })
        }

    }

    getSubscriptionDetails() {
        try {
            this.setState({ fetchingSubscriptionDetails: true })
            authService.getCustomerSubscription().then((response) => {
                this.setState({
                    ...this.state,
                    subscriptionDetails: response?.data?.subscriptionDetails || null,
                    fetchingSubscriptionDetails: false
                })
            }).catch((e) => {
                this.setState({ fetchingSubscriptionDetails: false })
                throw e;
            })
        } catch (e) {
            this.setState({ fetchingSubscriptionDetails: false })
        }

    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    };
    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    handlePauseSubscription = async (e) => {
        try {
            this.setState({
                ...this.state,
                subscriptionLoader: true
            })
            const response = await authService.pauseSubscription({ subscriptionId: this.state.subscriptionDetails?.id });
            if (response?.data?.success) {
                this.getSubscriptionDetails()
                window.location.reload();
            } else {
                toast.error(response?.data?.message)
            }
            this.setState({
                ...this.state,
                subscriptionLoader: false
            })
        } catch (e) {
            this.setState({
                ...this.state,
                subscriptionLoader: false
            })
        }
    }
    handleResumeSubscription = async (e) => {
        try {
            this.setState({
                ...this.state,
                subscriptionLoader: true
            })
            const response = await authService.resumeSubscription({ subscriptionId: this.state.subscriptionDetails?.id });
            if (response?.data?.success) {
                this.getSubscriptionDetails()
                window.location.reload();
            } else {
                toast.error(response?.data?.message)
            }
            this.setState({
                ...this.state,
                subscriptionLoader: false
            })
        } catch (e) {
            this.setState({
                ...this.state,
                subscriptionLoader: false
            })
        }
    }


    handleOnEditCard = async (e) => {
        try {
            e.preventDefault();
            if (!validateCardDetails(this.state.number, this.state.expiry, this.state.cvc)) {
                toast.error('Invalid card details provided.');
                return;
            }
            this.setState({ loading: true })
            const editCardPayload = {
                "expiryMonth": this.state.expiry.split('/')[0],
                "expiryYear": this.state.expiry.split('/')[1],
                "cardNumber": this.state.number.split(' ').join(''),
                "cvc": this.state.cvc
            }
            const response = await authService.editCard(editCardPayload);
            if (!response.data?.success) {
                toast.error(response.data?.message);
                this.setState({
                    ...this.state,
                    existingCard: {
                        last4: '****',
                        exp_month: '**',
                        exp_year: '**',
                        cvv: "***"
                    },
                    noActiveCard: true
                })
            } else {
                this.getCardDetails()
            }

            this.setState({ loading: false, showEditCardForm: false, focus: 'number' })
        } catch (e) {
            toast.error(e.message);
            this.setState({ loading: false })
        }

    }


    calculatePlanPrice = () => {
        const PlanAmount = this.state.subscriptionDetails?.plan?.amount;
        if (PlanAmount) {
            return (PlanAmount / 100).toFixed(2);
        } else {
            return 0;
        }
    }

    getSubscriptionEndDate = () => {
        const planEndDate = this.state.subscriptionDetails?.current_period_end
        if (planEndDate) {
            console.log(planEndDate, new Date(planEndDate), "new Date(planEndDate)")
            return moment(moment.unix(planEndDate)).format('MM-DD-YYYY')
        }
        return '';
    }

    render() {

        return (
            <>
                <div class="row mb-3">
                    <div class="col">
                        <div class="card bg-100 shadow-none border">
                            <div class="row gx-0 flex-between-center">
                                <div class="col-sm-auto d-flex align-items-center"><img
                                    class="ms-n2"
                                    src="/assets/img/illustrations/crm-bar-chart.png"
                                    alt=""
                                    width="90" />
                                    <div>
                                        <h6 class="text-primary fs--1 mb-0">Welcome to the</h6>
                                        <h4 class="text-primary fw-bold mb-0">Playlist SEARCH ENGINE &nbsp;
                                            <span class="text-info fw-medium">for Spotify Users</span>
                                        </h4>
                                    </div><img
                                        class="ms-n4 d-md-none d-lg-block"
                                        src="/assets/img/illustrations/crm-line-chart.png"
                                        alt=""
                                        width="150" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <div class="container">
                        {
                                    this.state.fetchingCardDetails || this.state.fetchingSubscriptionDetails ?
                                        <div >
                                            <p></p>
                                        </div> : <></>
                                }
                            <div className="row">
                              

                                <div className="col-md-6">
                                    <Cards
                                        cvc={this.state.showEditCardForm ? this.state.cvc : this.state?.existingCard?.cvv}
                                        expiry={this.state.showEditCardForm ? this.state.expiry : `${this.state?.existingCard?.exp_month}/${this.state?.existingCard?.exp_year}`}
                                        name={"*************"}
                                        number={this.state.showEditCardForm ? this.state.number : `**** **** **** ${this.state?.existingCard?.last4}`}
                                        focused={this.state.focus}
                                    />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <h4>Credit or Debit card</h4>
                                    <p>We use Stripe to process payments. It‘s secure and you can cancel anytime</p>
                                    <button
                                        className='not_requested btn rounded-pill d-block badge-soft-warning  text-truncate mt-2 mb-2'
                                        type='button'
                                        onClick={() => this.setState({ ...this.state, showEditCardForm: !this.state.showEditCardForm, number: '', cvc: '', expiry: '', focus: 'number' })}
                                        style={{ fontSize: 14, width: 200 }}
                                    >{this.state?.showEditCardForm ? `Cancel ${this.state.noActiveCard ? 'add' : 'edit'}` : `${this.state.noActiveCard ? 'Add' : 'Edit'} Card`} </button>
                                </div>

                            </div>
                            {
                                this.state.showEditCardForm &&
                                <div className="form">
                                    <div class="mb-5 mt-4">
                                        <label class="form-label" for="card-password">
                                            Card Number
                                        </label>
                                        <ReactInputMask
                                            mask="9999 9999 9999 9999"
                                            className="form-control"
                                            type="tel"
                                            name="number"
                                            placeholder="Card Number"
                                            value={this.state.number}
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div class="row gx-2">
                                        <div class="mb-3 col-sm-6">
                                            <label class="form-label" for="card-password">
                                                Expiry
                                            </label>
                                            <ReactInputMask
                                                mask="99/99"
                                                className="form-control"
                                                placeholder="MM/YY"
                                                name="expiry"
                                                value={this.state.expiry}
                                                onChange={this.handleInputChange}
                                                onFocus={this.handleInputFocus}
                                                validations={[required]}
                                            />
                                        </div>
                                        <div class="mb-3 col-sm-6">
                                            <label class="form-label" for="card-password">
                                                CVC
                                            </label>
                                            <ReactInputMask
                                                mask="999"
                                                type="text"
                                                className="form-control"
                                                name="cvc"
                                                placeholder="CVC"
                                                value={this.state.cvc}
                                                onChange={this.handleInputChange}
                                                onFocus={this.handleInputFocus}
                                                validations={[required]}
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <button
                                                class="btn btn-primary d-block w-100 mt-3"
                                                type="submit"
                                                name="submit"
                                                disabled={this.state.loading}
                                                onClick={this.handleOnEditCard}
                                            >
                                                {this.state.loading ? 'Loading...' : this.state.noActiveCard ? 'Add card' : 'Update card'}
                                            </button>
                                        </div>
                                    </div>
                                    <br />

                                </div>
                            }

                            {
                                this.state.subscriptionDetails &&
                                <div class="card bg-100 shadow-none border" style={{ padding: 10, borderRadius: 20, marginTop: 25 }}>
                                    <div style={{ display: 'flex', flex: 1, marginTop: 10, borderRadius: 20, alignItems: 'space-around', justifyContent: 'center', padding: 10 }}>
                                        <div style={{ display: 'flex', flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                                            <strong>{`The next payment $${this.calculatePlanPrice()} will be made automatically on ${this.getSubscriptionEndDate()}`}</strong>
                                        </div>
                                        <div style={{ display: 'flex', flex: 1 }} />
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <button className={`btn-danger btn`}  disabled={this.state?.subscriptionLoader}
                                                onClick={() => {
                                                    if (this.state.subscriptionDetails?.pause_collection === null) {
                                                        this.handlePauseSubscription()
                                                        window.location.href = 'https://playlistgoats.com/#cancel-survey';

                                                    } else {
                                                        this.handleResumeSubscription()
                                                    }
                                                }}
                                            >{this.state?.subscriptionLoader ? 'Loading...' : this.state.subscriptionDetails?.pause_collection === null ? 'Suspend Subscription' : 'Resume Subscription'}</button>
                                        </div>

                                    </div>
                                </div>

                            }

                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    pauseOnHover
                    theme="dark"
                />
            </>
        )
    }
}