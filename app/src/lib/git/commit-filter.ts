/** Criterion to filter commits against */
export enum CommitFilterType {
  NoFilter,
  Author,
  // TODO: CommitMessage
}

/**
 * A filter to limit the commits retrieved:
 * https://git-scm.com/docs/git-log#_commit_limiting
 */
export class CommitFilter {
  /** Method of filtering */
  public readonly type: CommitFilterType
  /** Pattern which must be matched to pass through filter */
  public readonly pattern: string

  public constructor(type?: CommitFilterType, pattern?: string) {
    this.type = type ?? CommitFilterType.NoFilter
    this.pattern = pattern ?? ''
  }

  public toGitLogArg(): string {
    // TODO: Prevent injection

    switch (this.type) {
      case CommitFilterType.NoFilter:
        return ''
      case CommitFilterType.Author:
        return '--author=' + this.pattern
    }
  }

  public hasEffect(): boolean {
    return this.type !== CommitFilterType.NoFilter && this.pattern.length > 0
  }
}
