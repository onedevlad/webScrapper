import { findRunning, findPending } from 'controllers/resource'
import { dbRecoveryResumeDownload } from 'src/server'


export default async () => {
  const running = await findRunning()
  const pending = await findPending()

  dbRecoveryResumeDownload([...running, ...pending])
}
