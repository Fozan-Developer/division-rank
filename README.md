# 🏆 Division Rank Library

The Division Rank library provides functionalities for managing user divisions based on their ratings. It includes methods to find which division a user belongs to and to retrieve users within a specific division.

For detailed documentation and usage instructions, please refer to the [full documentation](https://fozan.gitbook.io/division-rank/).

## Installation

To install the Division Rank library, you can use npm:

```bash
npm install @mr_fozan/division-rank
```

## Usage

Here is a basic example of using the library:

```javascript
const { RankSystem } = require('@mr_fozan/division-rank');

// Example initialization with initial divisions
const initialDivisions = [
    { name: 'Gold', options: { minPoints: 1000, maxPoints: 2000 } },
    { name: 'Silver', options: { minPoints: 500, maxPoints: 999 } }
];

const rankSystem = new RankSystem(initialDivisions);
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
