# Update Pull Request Description

### Easily update a Pull Requests description with this GitHub Action

## Usage

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
  - uses: riskledger/update-pr-description@dev
    with:
      body: ${{ description }} # The text you wish to overwrite your Pull Request description with, can be a variable or a string
      token: ${{ secrets.GITHUB_TOKEN }}
```

## Arguments

This action currently supports two inputs from the user: `body` and `token`. These inputs, along with their descriptions and usage contexts, are listed in the table below:

|  Input  |                                                 Description                                                 |   Usage    |
| :-----: | :---------------------------------------------------------------------------------------------------------: | :--------: |
| `body`  |                      The text you wish to overwrite your Pull Request description with                      | _Required_ |
| `token` | Your Github access token, which will already be available within your workflow without any additional setup | _Required_ |

## License

The code in this project is released under the [MIT](license).
