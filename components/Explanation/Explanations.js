const titles = {
  0: "Generating the Tree",
  1: "Assigning Columns",
  2: "Assigning Dots to Columns",
  3: "Reserve Punctuation",
  4: "Assignment Order",
  5: "Alphanumeric Sets"
}

const links = {
  0: "ternaryTree(Columns).svg",
  1: "ternaryTree(Columns2).svg",
  2: "assignDots.svg",
  3: "Punctuation4.svg",
  4: "Nums.svg",
  5: "AJ.svg",
}

const text = {
  0: `<p>
        This structure is a <i>ternary tree</i>- meaning each node in the structure has 3 branches. 
        It also has a depth of 2, denoting this branching process occurs twice off the root node. 
        The tree will branch to the right as it best relates to Braille. To cover the entirety of Alphanumerics, 
        there will be 4 such structures.
      </p>
    `,
  1: `<p>Our first step in generating Braille is to assign cell columns by way of depth.</p>
      <ul>
        <li>The root (depth 0) has no columns</li>
        <li>depth 1 adds the first column of dots (1-3)</li>
        <li>depth 2 adds the second column to the prior nodes cell.</li>
      </ul>
      <p>In this way, as you scan Braille cells one column at a time you move forward one branch in the tree.</p>
    `,
  2: `<p>
        Braille is separated into repeating sets, distinguished by the last dot of each column.
        For this reason, this structure only assigns the top 2 dots in a column. Given our rightward projection,
        a branch upward corresponds to the <strong>top</strong> dot of the given column, horizontal is the first <strong>two</strong> dots, and
        downward is the <strong>bottom</strong> dot of the first two. This lends itself to the saying "Top-2-Bottom".
      </p>
    `,
  3: `<p>
        The lowest global node at each depth is reserved for punctuation. This will leave to nodes left for Alphanumerics.
        This placement makes distinguishing the two very easy - as punctuation never occupy dots 1 or 4 while Alphanumerics must.
        We won't assign punctuation just yet, as they are unsorted and require a little more effort (click more to see).
      </p>
    `,
  4: `<p>
        Alphanumeric sets are assigned globally, in depth order- from the top most branch toward the bottom,
        then to the next depth [Top-to-Bottom, Left-to-Right].
      </p>
    `,
  5: `<p>Sets are identified either through a modifier (numbers) or the presence of dots 3 & 6.</p>
      <ul>
        <li>[A - J] Is filled in the absence of 3&6</li>
        <li>[1 - 9+0] Is identical to [A-J], but the string of #'s will be preceded by a number modifier.</li>
        <li> K-T adds dot 3 to the cells. </li>
        <li> [U, V, X, Y, Z] (u - Z minus w) adds dots 3&6 to each cell. Words [And, For, Of, The, With] fill the remaining spaces. They are in alphabetical order.</li>
      </ul>
    `
}

export { titles, links, text }