import Base from '@/mixins/Base'
import { ApplicationError, ErrorCode, ErrorMessageMap } from '@/model/Error'
import { Component, Mixins, Watch } from 'vue-property-decorator'

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
    const message = (error.message in ErrorMessageMap) ? ErrorMessageMap[error.message] : error.message

    this.$message.error(message)
  }
}
