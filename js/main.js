// Policy switcher: toggles between Piotr and Iga policy pages and persists selection
document.addEventListener('DOMContentLoaded', function () {
	try {
		const buttons = document.querySelectorAll('.switch-btn');
		const variants = document.querySelectorAll('.policy-variant');

		function showVariant(id) {
			variants.forEach(v => {
				v.style.display = (v.id === id) ? '' : 'none';
			});
			buttons.forEach(b => {
				if (b.dataset.target === id) b.classList.add('active');
				else b.classList.remove('active');
			});
			try { localStorage.setItem('policy-selected', id); } catch (e) { /* ignore */ }
		}

		buttons.forEach(btn => {
			btn.addEventListener('click', () => showVariant(btn.dataset.target));
		});

		// Initialize from localStorage or default to Piotr
		const saved = (function () {
			try { return localStorage.getItem('policy-selected'); } catch (e) { return null; }
		})();
		const initial = saved || 'policy-piotr';
		showVariant(initial);
	} catch (err) {
		// if DOM elements missing, do nothing
		console.error('Policy switcher init error', err);
	}
});