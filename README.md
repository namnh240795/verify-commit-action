# Inspired by https://github.com/hunghg255/verify-commit-msg

This action gonna check the commit lint of the pull request

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: @namnh240795/verify-commit-message-action
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
```
