# Basename Registration Example

This repository demonstrates how to register [Basename](https://www.base.org/names) using JavaScript. Basename are [Base]'s human-readable address naming system that simplifies transactions and helps establish your onchain identity.

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/hughescoin/basename-registration-example-js.git
cd basename-registration-example-js
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your Basename:

Edit the `.env` file and replace the `BASE_NAME` value with your desired name:

```
BASE_NAME="yourname.basetest.eth"
```

## Usage

Run the registration script:

```bash
npm run register
# or
node register-basename.js
```

## License

MIT

---

_Note: Make sure to follow Base's naming conventions and requirements when selecting your Base Name._

---

[Baseame]: https://www.base.org/names
[Base]: https://www.base.org
