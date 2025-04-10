import * as React from 'react'
import { Dialog, DialogContent, DialogFooter } from '../dialog'
import { OkCancelButtonGroup } from '../dialog/ok-cancel-button-group'
import { LinkButton } from '../lib/link-button'
import { Ref } from '../lib/ref'

interface IPushProtectionErrorDialogProps {
  readonly tokenDescription: string
  readonly bypassURL: string
  readonly commitSha: string
  readonly path: string
  readonly lineNumber: number

  readonly onDismissed: () => void
}

/**
 * The dialog shown when a push is denied by GitHub's push protection feature of secret scanning.
 */
export class PushProtectionErrorDialog extends React.Component<
IPushProtectionErrorDialogProps, {}
> {

  public render() {
    return (
      <Dialog
        title={
          __DARWIN__ ? 'Secret Detected' : 'Secret detected'
        }
        onDismissed={this.props.onDismissed}
        onSubmit={this.props.onDismissed}
        type="error"
        role="alertdialog"
        ariaDescribedBy='push-protection-error-dialog-description'
        className="push-protection-error-dialog"
      >
        <DialogContent>
          <div id="push-protection-error-dialog-description">
            <p>
            <LinkButton uri="https://docs.github.com/code-security/secret-scanning/protecting-pushes-with-secret-scanning}">Secret Scanning
            </LinkButton> found a <b>{this.props.tokenDescription.replace('—', '')}</b> in the file <Ref>{this.props.path}</Ref> at line <Ref>{this.props.lineNumber}</Ref> in commit <Ref>{this.props.commitSha}</Ref>.
            </p>
            <p>
            Allowing this secret risks exposure. Consider <LinkButton uri="https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-in-the-github-ui#resolving-a-blocked-commit">removing the secret from your commit and commit history.</LinkButton>
            </p>
            <p>
            Exposing this secret can allow someone to:
            <ul>
              <li>Verify the identity of this GitHub Personal Access Token secret</li>
              <li>Know which resources this secret can access</li>
              <li>Act on behalf of the secret's owner</li>
              <li>Push this secret to this repository without being blocked</li>
            </ul>
          </p>
          <p>You may also <LinkButton uri={this.props.bypassURL}>bypass this protection on GitHub.com</LinkButton></p>
          </div>
          
        </DialogContent>
        <DialogFooter>
          <OkCancelButtonGroup cancelButtonVisible={false}/>
        </DialogFooter>
      </Dialog>
    )
  }
}
