// maps.js

// ---- Constants ----
const BOARD_SIZE = 8;
const SQUARE_SIZE = 100;

const PieceType = {
  GOAL: 'G',
  PAWN: 'P',
  ROOK: 'R',
  BISHOP: 'B',
  KNIGHT: 'N',
  SPIKES: 'S',
  QUEEN: 'Q',
  PLAYER: 'A',
  EMPTY: ' ',
};

// ---- Utility Functions ----
/**
 * Returns true with the given probability (default 50%).
 */
const getRandomBoolean = (P = 0.5) => Math.random() < P;

/**
 * Returns an array of 8 cells with all spaces except one random position.
 * Optional parameters let you limit which columns can be chosen.
 */
function getRandomMapPosition(
  piece = PieceType.GOAL,
  between = 0,
  and = BOARD_SIZE,
  not = [9, 10]
) {
  const position = Math.floor(Math.random() * (and - between) + between);
  if (Array.isArray(not) && not.includes(position)) {
    return getRandomMapPosition(piece, between, and, not);
  }
  const result = new Array(BOARD_SIZE).fill(PieceType.EMPTY);
  result[position] = piece;
  return result;
}

/**
 * Returns a function that, when called, creates an array of 8 characters
 * from the given string. (Spaces are preserved.)
 */
const staticRow = (str) => () => str.split('');

// ---- Map Layout Class ----
class MapLayout {
  /**
   * @param {number} level - The level number.
   * @param {Array<Function>} baseRows - An array of functions that each return an array of 8 cells.
   * @param {Array<Function>} [modifications=[]] - An array of functions that accept the layout and modify it.
   */
  constructor(level, baseRows, modifications = []) {
    this.level = level;
    this.baseRows = baseRows;
    this.modifications = modifications;
  }

  /**
   * Generates the 8×8 board (as an array of arrays) and applies any modifications.
   */
  generate() {
    // Build layout: if a row is defined by a function, call it
    let layout = this.baseRows.map((rowFunc) => rowFunc());
    // Apply any level-specific random modifications
    this.modifications.forEach((mod) => mod(layout));
    return layout;
  }
}

// ---- Map Definitions ----
// Each MapLayout below represents one level. We use string literals for static rows,
// and function calls (like getRandomMapPosition) for rows that need randomness.

const maps = [
  // Map 0
  new MapLayout(0, [
    () => getRandomMapPosition(PieceType.GOAL),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    () => getRandomMapPosition(PieceType.PLAYER),
  ]),

  // Map 1
  new MapLayout(1, [
    () => getRandomMapPosition(PieceType.GOAL),
    staticRow('        '),
    staticRow('   P    '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    () => getRandomMapPosition(PieceType.PLAYER),
  ]),

  // Map 2 – with a random modification on row 3
  new MapLayout(2, [
    () => getRandomMapPosition(PieceType.GOAL),
    staticRow(' P      '),
    () => getRandomMapPosition(PieceType.PAWN, 2, 5),
    staticRow('        '),
    () => getRandomMapPosition(PieceType.PAWN, 2, 5),
    staticRow('        '),
    staticRow('        '),
    () => getRandomMapPosition(PieceType.PLAYER),
  ]),

  // Map 3 – with two rows of pawns that may be reversed randomly
  new MapLayout(
    3,
    [
      () => getRandomMapPosition(PieceType.GOAL),
      staticRow('        '),
      staticRow('  PPPPP '),
      staticRow('  PPPPP '),
      staticRow('        '),
      staticRow('        '),
      staticRow('        '),
      () => getRandomMapPosition(PieceType.PLAYER),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout[2].reverse();
          layout[3].reverse();
        }
      },
    ]
  ),

  // Map 4
  new MapLayout(
    4,
    [
      () => getRandomMapPosition(PieceType.GOAL, 2, 5),
      staticRow('  PPPPPP'),
      staticRow('        '),
      staticRow('PPPPPP  '),
      staticRow('        '),
      staticRow('   PPPPP'),
      staticRow('        '),
      () => getRandomMapPosition(PieceType.PLAYER, 2, 5),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout[1].reverse();
          layout[3].reverse();
          layout[5].reverse();
        }
      },
    ]
  ),

  // Map 5 – with a tweak on row 3
  new MapLayout(
    5,
    [
      () => getRandomMapPosition(PieceType.GOAL, 2, 5),
      staticRow('        '),
      staticRow('P      P'),
      staticRow(' PPP  P '),
      staticRow('  PPPP  '),
      staticRow('        '),
      staticRow('        '),
      () => getRandomMapPosition(PieceType.PLAYER, 2, 5),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout[2].reverse();
          layout[3].reverse();
          layout[4].reverse();
        }
      },
    ]
  ),

  // Map 6 – with a couple of cell modifications
  new MapLayout(
    6,
    [
      () => getRandomMapPosition(PieceType.GOAL, 2, 5),
      staticRow('    P   '),
      staticRow('      PP'),
      staticRow('P P  P  '),
      staticRow(' PP P   '),
      staticRow(' P      '),
      staticRow('        '),
      () => getRandomMapPosition(PieceType.PLAYER),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout[4][1] = PieceType.EMPTY;
          layout[3][4] = PieceType.PAWN;
        }
      },
    ]
  ),

  // Map 7 – with a random reversal of every row
  new MapLayout(
    7,
    [
      staticRow('        '),
      staticRow('PPP     '),
      staticRow('GP      '),
      staticRow('     PPP'),
      staticRow('PPP    P'),
      staticRow(' P      '),
      staticRow('        '),
      () => getRandomMapPosition(PieceType.PLAYER),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout.forEach((row) => row.reverse());
        }
      },
    ]
  ),

  // Map 8
  new MapLayout(8, [
    () => getRandomMapPosition(PieceType.GOAL, 2, 5),
    staticRow('   P    '),
    staticRow('        '),
    staticRow(' P R  P '),
    staticRow('        '),
    staticRow('   P    '),
    staticRow('        '),
    () => getRandomMapPosition(PieceType.PLAYER),
  ]),

  // Map 9 – with a random reversal of every row
  new MapLayout(
    9,
    [
      staticRow(' R      '),
      staticRow('G R     '),
      staticRow('   R    '),
      staticRow('    R   '),
      staticRow('     R  '),
      staticRow('PPPPPP  '),
      staticRow('        '),
      () => getRandomMapPosition(PieceType.PLAYER),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout.forEach((row) => row.reverse());
        }
      },
    ]
  ),

  // Map 10 – with specific cell changes
  new MapLayout(10, [
    staticRow('    R  P'),
    staticRow(' G      '),
    staticRow('        '),
    staticRow('PP      '),
    staticRow('R   P  P'),
    staticRow('P       '),
    staticRow('        '),
    () => getRandomMapPosition(PieceType.PLAYER, 0, 2),
  ]),

  // Map 11
  new MapLayout(11, [
    staticRow('PG    R '),
    staticRow('R     P '),
    staticRow('R    P  '),
    staticRow('        '),
    staticRow('   P    '),
    staticRow('P  P    '),
    staticRow('   PPPPP'),
    staticRow(' A      '),
  ]),

  // Map 12
  new MapLayout(12, [
    staticRow('    G   '),
    staticRow('  P     '),
    staticRow('        '),
    staticRow('    B   '),
    staticRow('     P  '),
    staticRow('        '),
    staticRow('        '),
    staticRow(' A      '),
  ]),

  // Map 13 – with a minor random tweak
  new MapLayout(13, [
    staticRow('    G   '),
    staticRow('        '),
    staticRow(' P P P  '),
    staticRow('B B B B '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    staticRow(' A      '),
  ]),

  // Map 14
  new MapLayout(14, [
    staticRow('    G   '),
    staticRow('R P  P R'),
    staticRow('P      P'),
    staticRow('        '),
    staticRow('B      B'),
    staticRow('PP    PP'),
    staticRow('        '),
    staticRow(' A      '),
  ]),

  // Map 15
  new MapLayout(
    15,
    [
      staticRow('    G  B'),
      staticRow('       R'),
      staticRow('    P   '),
      staticRow('   P    '),
      staticRow('  P    P'),
      staticRow('PP      '),
      staticRow('        '),
      staticRow(' A      '),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout.forEach((row) => row.reverse());
        }
      },
    ]
  ),

  // Map 16
  new MapLayout(16, [
    staticRow('  G     '),
    staticRow('        '),
    staticRow('        '),
    staticRow('    N   '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    () => getRandomMapPosition(PieceType.PLAYER, 1, 5),
  ]),

  // Map 17 – with a small tweak in two cells
  new MapLayout(
    17,
    [
      staticRow('      G '),
      staticRow('        '),
      staticRow('      NN'),
      staticRow('        '),
      staticRow('PNN     '),
      staticRow('        '),
      staticRow('        '),
      () => getRandomMapPosition(PieceType.PLAYER),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout[3][2] = PieceType.KNIGHT;
          layout[4][2] = PieceType.EMPTY;
        }
      },
    ]
  ),

  // Map 18
  new MapLayout(18, [
    staticRow('    G   '),
    staticRow('        '),
    staticRow('        '),
    staticRow('    S   '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    () => getRandomMapPosition(PieceType.PLAYER),
  ]),

  // Map 19 – with several cell modifications
  new MapLayout(
    19,
    [
      staticRow('       G'),
      staticRow('  SSSSSS'),
      staticRow(' SS    S'),
      staticRow('S   SSSS'),
      staticRow('S SSS   '),
      staticRow('S     S '),
      staticRow('SSSSSSS '),
      () => getRandomMapPosition(PieceType.PLAYER, 0, 3),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout[2][0] = PieceType.SPIKES;
          layout[2][2] = PieceType.EMPTY;
          layout[3][3] = PieceType.SPIKES;
          layout[4][4] = PieceType.EMPTY;
        }
      },
    ]
  ),

  // Map 20 – with a minor random tweak
  new MapLayout(
    20,
    [
      staticRow('      G '),
      staticRow(' P  PSS '),
      staticRow(' S P   S'),
      staticRow('SPS P P '),
      staticRow('     SP '),
      staticRow('SS SS S '),
      staticRow(' S  S   '),
      () => getRandomMapPosition(PieceType.PLAYER),
    ],
    [
      (layout) => {
        if (getRandomBoolean()) {
          layout.forEach((row) => row.reverse());
        }
      },
    ]
  ),

  // Map 21
  new MapLayout(21, [
    staticRow('RG   B R'),
    staticRow('   P B P'),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    staticRow(' N      '),
    staticRow('        '),
    staticRow('     A  '),
  ]),

  // Map 22
  new MapLayout(22, [
    staticRow('        '),
    staticRow('        '),
    staticRow('   Q    '),
    staticRow('        '),
    staticRow('        '),
    staticRow('        '),
    staticRow('   A    '),
    staticRow('        '),
  ]),
];
