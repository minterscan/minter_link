import Base from '@/mixins/Base'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { ApplicationError, ErrorCode, ErrorMessageMap } from '@/model/Error'

/**
 * Error handler
 */

@Component
export default class Error extends Mixins(Base) {
  @Watch('ui.error')
  async onErrorChange (error: ApplicationError | null) {
    this.$message.destroy()

    if (!error) return

    this.handle(error)
    this.draw(error)
  }

  // Keyring expired, logout
  handle (error: ApplicationError) {
    if (error.message === ErrorCode.Unauthorized) {
      this.state.commitLoggedIn(false)
    }
  }

  // Draw error message via Ant
  // https://www.antdv.com/components/message/
  draw (error: ApplicationError) {
    const message = (error.message in ErrorMessageMap) ? ErrorMessageMap[error.message as ErrorCode] : error.message

    this.$message.error(message)
  }
}
