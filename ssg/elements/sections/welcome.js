import { stringToFragment } from '../../utils.js';

const tmplHeader = `
<div id="div-welcome-header">
	<h1>
		Hey there!<br />
		I&#39;m
		<span class="clr-green">Jens</span> aka<br />
		<span class="clr-green">error&#8209;four&#8209;o&#8209;four</span><br />
	</h1>
	<h2>
		I create things with <span id="txt-animated">&lt;code&#47;&gt;</span>
	</h2>
</div>`;

const tmplPicture = `
<div id="div-welcome-pfp">
	<div id="div-pfp">
		<img id="img-pfp-bg" data-src="assets/pfp-bg.svg" alt="bg">
		<img id="img-pfp" data-src="assets/pfp-16px.svg" alt="pfp">
	</div>
</div>`;

export default () => stringToFragment(tmplHeader + tmplPicture);
