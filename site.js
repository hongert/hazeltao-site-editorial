// 菜单开关
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
	menuBtn.addEventListener('click', () => {
		const open = menu.classList.toggle('open');
		menuBtn.setAttribute('aria-expanded', open);
	});
}

// ---------- 详情页 ----------
// 每个项目：封面、文字、所有单页（spread 已拆成单页）
const PROJECTS = {
	'in-and-around': {
		title: 'In and Around',
		subtitle: 'Cultures of Design and the Design of Cultures, Part 2',
		year: 2026,
		medium: 'Brochure',
		size: '6.8 × 4.5 in',
		pages: 16,
		text: 'A brochure built around Andrew Blauvelt’s essay <em>In and Around: Cultures of Design and the Design of Cultures, Part 2</em>, first published in 1995 in <em>Emigre</em> 33.',
		meta: [
			['Project type', 'publication'],
			['Course', 'Advanced Transmedia Studio, ArtCenter College of Design'],
		],
		dir: 'images/in-and-around/',
		count: 16,
		w: 2448,
		h: 3168,
	},
};

const entry = document.getElementById('entry');
if (entry) {
	const slug = new URLSearchParams(location.search).get('p');
	const p = PROJECTS[slug];
	if (!p) {
		location.replace('./');
	} else {
		document.title = p.title + ' — Hazel Tao';
		const page = (n) => p.dir + 'page-' + String(n).padStart(2, '0') + '.jpg';
		const img = (n, eager) => `<img src="${page(n)}" width="${p.w}" height="${p.h}" alt="${p.title}, page ${n}"${eager ? '' : ' loading="lazy"'}>`;
		entry.innerHTML = `
			<div class="entry-cover">${img(1, true)}</div>
			<div class="entry-text">
				<ul class="specs">
					<h3>${p.title}</h3>
					${p.subtitle ? `<li>${p.subtitle}</li>` : ''}
					<li>${p.year}</li>
					<li>${p.medium}</li>
					<li>${p.size}</li>
					<li>${p.pages} pages</li>
				</ul>
				<p>${p.text}</p>
				<ul class="meta">${p.meta.map(([k, v]) => `<li>${k}: ${v}</li>`).join('')}</ul>
			</div>`;
		const rest = [];
		for (let n = 2; n <= p.count; n++) rest.push(`<figure>${img(n)}</figure>`);
		document.getElementById('pages').innerHTML = rest.join('');
	}
}
