import * as React from 'react'
import { connect } from 'react-redux'

export const UPDATE_TIME = 200
export const MAX_PROGRESS = 90
export const PROGRESS_INCREASE = 5
export const ANIMATION_TIME = UPDATE_TIME * 2

const initialState = {
  percent: 0,
  progressInterval: null,
  animationTimeout: null,
}

export interface LoadingBarState {
    percent: number,
    progressInterval: any;
    animationTimeout: any;
}

export interface LoadingBarProps {
    loading: number;
}

export class LoadingBar extends React.Component<LoadingBarProps, LoadingBarState> {
  constructor(props) {
    super(props)

    this.state = initialState

    this.simulateProgress = this.simulateProgress.bind(this)
    this.resetProgress = this.resetProgress.bind(this)
  }

  componentWillMount() {
    if (this.props.loading > 0) {
      this.launch()
    }
  }

  componentWillReceiveProps(nextProps: LoadingBarProps) {
    if (nextProps.loading > this.props.loading) {
      this.launch()
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.progressInterval)
    clearTimeout(this.state.animationTimeout)
  }

  launch() {
    let { progressInterval, percent } = this.state
    const { animationTimeout } = this.state

    if (!progressInterval) {
      progressInterval = setInterval(
        this.simulateProgress,
        200,
      )
      clearTimeout(animationTimeout)
      percent = 0
    }

    this.setState({ ...this.state, progressInterval, percent })
  }

  simulateProgress() {
    let { progressInterval, percent, animationTimeout } = this.state
    const { loading } = this.props

    if (percent === 100) {
      clearInterval(progressInterval)
      animationTimeout = setTimeout(this.resetProgress, ANIMATION_TIME)
      progressInterval = null
    } else if (loading === 0) {
      percent = 100
    } else if (percent + 3 <= 90) {
      percent += 3
    }

    this.setState({ percent, progressInterval, animationTimeout })
  }

  resetProgress() {
    this.setState(initialState)
  }

  buildStyle() {
    const style = {
        width: `${this.state.percent}%`,
        opacity: '1',
    } as any;

    return style;
  }

  render() {
    const style = this.buildStyle()

    const shouldShow = this.state.percent > 0 && this.state.percent < 100

    if (shouldShow) {
      style.opacity = '1'
    } else {
      style.opacity = '0'
    }

    return (
        <div className={'loading-bar-container'}>
            <div style={style} className={'loading-bar'} />
            <div style={{ display: 'table', clear: 'both' }} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loadingBarReducer.loading,
})

export default connect(mapStateToProps)(LoadingBar)
