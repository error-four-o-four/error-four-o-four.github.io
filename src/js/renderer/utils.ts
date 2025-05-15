export const createSectionHTMLBefore = (data: string) => `
<span class="clr-yellow">const</span>
<span>${data}</span>
<span class="clr-orange">&equals;</span>
<span class="clr-yellow">&lbrack;</span>`;

export const createSectionHTMLAfter = () => `
<span class="clr-yellow">&rbrack;</span>&semi;
<br />
<br />
<br />`;
