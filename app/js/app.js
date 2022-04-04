// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	let addLeadBtn = document.getElementById('addLead');
	let addLeadContainer = document.querySelector('.funnel__addLead');
	
	
	
	let nameLead = document.querySelector('.funnel__form-name')
	let phoneLead = document.querySelector('.funnel__form-phone')
	let serviceLead = document.querySelector('.funnel__form-service')
	let priceLead = document.querySelector('.funnel__form-price')
	let selectLead = document.querySelector('.funnel__form-select')
	let generateLeadBtn = document.getElementById('sendFormLead')
	let columnWorkContainer = document.getElementById('workColumn')
	let allCards = document.querySelectorAll('.card')
	let map = document.querySelector('.map')
	let filter = document.querySelector('.filter')
	let task = document.querySelector('.task')
	const closeMapBtn = document.querySelectorAll('[data-closeCall]')
	const closeTaskBtn = document.querySelectorAll('[data-closeTask]')
	const closeFilterBtn = document.querySelectorAll('[data-closeFilter]')
	const openTaskBtn = document.querySelectorAll('[data-openTask]')
	const toggleFilterBtn = document.querySelector('.header__button')
	
	const searchBtn = document.querySelector('.header__button-search')
	const searchBtnClose = document.querySelector('.header__closeBtn')
	const searchContainer = document.querySelector('.header__search')

	const mapTask = document.querySelector('.map__task')
	const mapTaskClose = document.querySelector('.task__closeTask')
	const mapTaskContainer = document.querySelector('.map__newTask')

	if (mapTask) {
		mapTask.addEventListener('click', () => {
			mapTaskContainer.classList.add('active')
		})
		mapTaskClose.addEventListener('click', () => {
			mapTaskContainer.classList.remove('active')
		})
	}


	if (searchBtn) {
		searchBtn.addEventListener('click', () => {
			searchBtn.classList.add('active')
			searchContainer.classList.add('active')
		})
		searchBtnClose.addEventListener('click', () => {
			searchBtn.classList.remove('active')
			searchContainer.classList.remove('active')
		})

	}



	function openMap() {
		document.body.classList.add('BodyOverflow');
		map.classList.add('active')
	}

	function closeMap() {
		document.body.classList.remove('BodyOverflow');
		map.classList.remove('active')
	}

	function openTask() {
		document.body.classList.add('BodyOverflow');
		task.classList.add('active')
	}

	function closeTask() {
		document.body.classList.remove('BodyOverflow');
		task.classList.remove('active')
	}

	function openFilter() {
		document.body.classList.add('BodyOverflow');
		filter.classList.add('active')
	}

	function closeFilter() {
		document.body.classList.remove('BodyOverflow');
		filter.classList.remove('active')
	}

	if (toggleFilterBtn) {
		toggleFilterBtn.addEventListener('click', (event) => {
			if (filter.classList.contains('active')) {
				closeFilter()
			} else {
				openFilter()
			}
		})
	}




	allCards.forEach(item => {
		item.addEventListener('click', openMap)
	})

	closeMapBtn.forEach(item => {
		item.addEventListener('click', (e) => {
		  if (e.target === item) {
				closeMap()
		  }
		})
	})




	openTaskBtn.forEach(item => {
		item.addEventListener('click', openTask)
	})

	closeTaskBtn.forEach(item => {
		item.addEventListener('click', (e) => {
		  if (e.target === item) {
				closeTask()
		  }
		})
	})


	closeFilterBtn.forEach(item => {
		item.addEventListener('click', (e) => {
		  if (e.target === item) {
			closeFilter()
		  }
		})
	})


	

	addLeadBtn.addEventListener('click', () => {
		addLeadContainer.classList.toggle('active')
	})
	


	function checkFormLead() {
		let isValid = true;

		if (nameLead.value.length == 0) isValid = false
		if (phoneLead.value.length == 0) isValid = false
		if (serviceLead.value.length == 0) isValid = false
		if (priceLead.value.length == 0) isValid = false
		
		if (isValid) {
			generateLeadBtn.removeAttribute("disabled");
		} else {
			generateLeadBtn.setAttribute("disabled", 'true');
		}
	}

	
	nameLead.addEventListener('input', checkFormLead)
	phoneLead.addEventListener('input', checkFormLead)
	serviceLead.addEventListener('input', checkFormLead)
	priceLead.addEventListener('input', checkFormLead)


	function generateCardLead(name, phone, service, price, responsible) {
		// <div class="funnel__card card" draggable="true">
		let templateCard = `
			<div class="card__client">
				<div class="card__name">${name}</div>
				<div class="card__phone">${phone}</div>
			</div>
			<div class="card__info">
				<div class="card__finance">
					<img src="images/dist/icons/service.svg" alt="">
					<div class="card__group">
						<div class="card__service">${service}</div>
						<div class="card__price">${price} ₽</div>
					</div>
				</div>
				<div class="card__liable">
					<img src="images/dist/icons/card.svg" alt="">
					<div class="card__group">
						<div class="card__responsible-name">${responsible}</div>
						<div class="card__responsible">Ответственный</div>
					</div>
				</div>
			</div>
			`
			// </div>
		// columnWorkContainer
		let cardcContainer = document.createElement('div')
		cardcContainer.classList.add('funnel__card')
		cardcContainer.classList.add('card')
		cardcContainer.setAttribute("draggable", 'true');
		cardcContainer.innerHTML = templateCard
		// columnWorkContainer.insertAdjacentHTML('beforeend',templateCard)
		columnWorkContainer.append(cardcContainer)
	}

	
	function generateNewLead() {
		generateCardLead(nameLead.value, phoneLead.value, serviceLead.value, priceLead.value, selectLead.value)
		nameLead.value = ''
		phoneLead.value = ''
		serviceLead.value = ''
		priceLead.value = ''
		selectLead.value = 'value1'
		addLeadContainer.classList.remove('active')
		generateLeadBtn.setAttribute("disabled", 'true');
		dragAndDrop()
	}


	generateLeadBtn.addEventListener('click', generateNewLead)
	




	const dragAndDrop = () => {
		const cards = document.querySelectorAll('.card');
		const cells = document.querySelectorAll('.funnel__work');
		let dragItem 

		const dragStart = function() {
			dragItem = this
			 setTimeout(() => {
				 this.classList.add('hide')
			 }, 0)
		}

		const dragEnd = function() {
			this.classList.remove('hide')
		}

		const dragOver = function(evt) {
			evt.preventDefault();
		}

		const dragEnter = function(evt) {
			evt.preventDefault();
			this.classList.add('hovered')
		}
		
		const dragLeave = function() {
			this.classList.remove('hovered')
		}
		
		const dragDrop = function() {
			this.append(dragItem);
			this.classList.remove('hovered')
		}

		cells.forEach((cell) => {
			cell.addEventListener('dragover', dragOver)
			cell.addEventListener('dragenter', dragEnter)
			cell.addEventListener('dragleave', dragLeave)
			cell.addEventListener('drop', dragDrop)
		});

		cards.forEach((card) => {
			card.addEventListener('dragstart', dragStart)
			card.addEventListener('dragend', dragEnd)
		})

	};

	dragAndDrop()



})
