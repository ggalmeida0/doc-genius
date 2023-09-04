# Local Setup

## Installations:

- Install the SAM CLI
- Install Docker
- Install node 18 and npm
- Install AWS-CLI
- Install Zip cli tool (in Ubuntu: sudo apt-get install zip)
- Inside each directory install the dependecies by running npm i.

## Setup

1. Add a resource-config.ts file in `infra/lib/resources-config.ts`. This is omited for security reasons. If you want to leave the default values you just have:

```typescript
export const handlerConfig = {};
```

2. Add a `.env` file in the root directory. Eg:

```bash
OPENAI_ORG_ID=your-org-id
```

3. Configure your aws account in the cli `aws configure`. Run the full deploy script:

```bash
sh fullDeploy.sh
```
