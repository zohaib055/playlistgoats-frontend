import { useNProgress } from '@tanem/react-nprogress'
import React from 'react'

import Bar from './bar.component'
import Container from './container.component'
import Spinner from './spinner.component'

const Progress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  )
}

export default Progress
