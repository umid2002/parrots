const elParrotsTemplate = document.querySelector("#parrots-template");
const elParrotsWrapper = document.querySelector(".parrots-wrapper");
 


const createParrots = (parrot) => {
    const elParrotsRow = elParrotsTemplate.cloneNode(true).content;
    const { id, title, img, price, birthDate, sizes, isFavorite, features } = parrot;
    const { width, height } = sizes;

    const elParrotTitle = elParrotsRow.querySelector(".card-title");
    elParrotTitle.textContent = title;
    const elParrotImg = elParrotsRow.querySelector(".card-img-top").src = `${img}`
    const elParrotPrice = elParrotsRow.querySelector(".card-price");
    elParrotPrice.textContent = price;
    const elParrotsBirthdate = elParrotsRow.querySelector(".card-birthdate");
    elParrotsBirthdate.textContent = birthDate;
    const elParrotSize = elParrotsRow.querySelector('.card-size');
    elParrotSize.textContent = `${width}sm ${height}sm`;
    const elParrotIsFavourite = elParrotsRow.querySelector('.favourites');
    if (isFavorite) {
        elParrotIsFavourite.className = 'fa-solid fa-star'
    } else {
        elParrotIsFavourite.className = 'fa fa-star-o'
    }
    const featureLoop = features.split(',');
    featureLoop.forEach(e => {
        // console.log(e);
        const elListUnstyled = elParrotsRow.querySelector('.features-list')
        const elFeaturesList = document.createElement('li');
        elFeaturesList.className = 'badge bg-primary me-1 mb-1 features parrot-features'
        elFeaturesList.textContent = e;
        elListUnstyled.appendChild(elFeaturesList)
    })
    // Delete Btn
    const elBtnDelete = elParrotsRow.querySelector('.btn-delete');
    elBtnDelete.dataset.id = id;
    // Edit Btn
    const elBtnEdit = elParrotsRow.querySelector('.btn-edit');
    elBtnEdit.dataset.id = id;
    // Favourite Btn
    const btnFavourites = elParrotsRow.querySelector('.btn-favourite')
    btnFavourites.dataset.id = id
    // console.log(btnFavourites);
    return elParrotsRow
}

const renderProducts = (productArray = products) => {
    elParrotsWrapper.innerHTML = ""
    productArray.forEach((parrot) => {
        const elParrotRows = createParrots(parrot);
        elParrotsWrapper.appendChild(elParrotRows);
    })
}
renderProducts()



// DELETE AND EDIT PRODUCTS
const elEditModal = new bootstrap.Modal("#edit-parrot-modal");
const elEditForm = document.querySelector('#edit-product-form')
const elEditTitle = elEditForm.querySelector('#title');
const elEditImg = elEditForm.querySelector("#img");
const elEditPrice = elEditForm.querySelector("#price");
const elEditDate = elEditForm.querySelector("#date");
const elEditWidth = elEditForm.querySelector("#width");
const elEditHeight = elEditForm.querySelector("#height");
const elEditFeatures = elEditForm.querySelector("#features");



elParrotsWrapper.addEventListener('click', evt => {
    if (evt.target.matches('.btn-delete')) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnIndex = products.findIndex((product) => {
            return product.id == clickedBtnId
        })
        products.splice(clickedBtnIndex, 1)
        renderProducts()
    }

    if (evt.target.matches(".btn-edit")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnObj = products.find((product) => {
            return product.id === clickedBtnId;
        })
        // console.log(clickedBtnId); // true
        elEditTitle.value = clickedBtnObj.title;
        elEditImg.value = clickedBtnObj.img;
        elEditPrice.value = clickedBtnObj.price;
        elEditDate.value = clickedBtnObj.birthDate;
        elEditWidth.value = clickedBtnObj.sizes.width;
        elEditHeight.value = clickedBtnObj.sizes.height;
        elEditFeatures.value = clickedBtnObj.features;
        elEditForm.setAttribute("data-editing-id", clickedBtnId)
        // console.log(elEditForm); // true
    }

})

elEditForm.addEventListener("submit", event => {
    event.preventDefault();

    const submittingItemId = +event.target.dataset.editingId;
    // console.log(submittingItemId);

    const titleValue = elEditTitle.value.trim();
    const imgValue = elEditImg.value.trim();
    const priceValue = +elEditPrice.value.trim();
    const dateValue = elEditDate.value.trim();
    const widthValue = +elEditWidth.value.trim();
    const heightValue = +elEditHeight.value.trim();
    const featuresValue = elEditFeatures.value.trim();

    if (titleValue && imgValue && dateValue && widthValue && heightValue && featuresValue && priceValue > 0) {
        const submittingItemIndex = products.findIndex(product => product.id === submittingItemId);
        const submittingItemObj = {
            id: submittingItemId,
            title: titleValue,
            img: imgValue,
            price: priceValue,
            birthDate: dateValue,
            sizes: {
                width: widthValue,
                height: heightValue
            },
            isFavorite: true,
            features: featuresValue
        }

        products.splice(submittingItemIndex, 1, submittingItemObj);
        elEditModal.hide();
        renderProducts();
    } else {
        alert("Malumotlarni to`liq kiriting iltimos.")
    }
})

// Add new students

const elProductForm = document.querySelector("#add-product-form"); // form element

elProductForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const formElements = evt.target.elements; // elements in form.
    // console.log(formElements);
    const titleInputValue = formElements.title.value.trim();
    const imgInputValue = formElements.img.value.trim();
    const priceInputValue = +formElements.price.value.trim();
    const DateInputValue = formElements.date.value.trim()
    const WidthInputValue = +formElements.width.value.trim()
    const HeightInputValue = +formElements.height.value.trim()
    const FeaturesInputValue = formElements.features.value.trim()

    if (titleInputValue && imgInputValue && DateInputValue && WidthInputValue > 0 && HeightInputValue > 0 && FeaturesInputValue && priceInputValue > 0) {
        const addingProduct = {
            id: Math.floor(Math.random() * 1000),
            title: titleInputValue,
            img: imgInputValue,
            price: priceInputValue,
            birthDate: DateInputValue,
            sizes: {
                width: WidthInputValue,
                height: HeightInputValue
            },
            isFavorite: false,
            features: FeaturesInputValue
        }
        products.unshift(addingProduct);
        const elNewProduct = createParrots(addingProduct);
        elParrotsWrapper.prepend(elNewProduct);
    } else {
        alert("Iltimos ma`lumotlarni to`g`ri kiriting.")
    }


})


// Filter and Sort
const elFilterForm = document.querySelector("#filter");

elFilterForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const elements = evt.target.elements;
    const searchValue = elements.search.value;
    const fromValue = +elements.from.value;
    const toValue = +elements.to.value;
    const sortValue = elements.sortby.value;
    const filtredProducts = products
        .filter(function (element) {
            const isTitleMatches = element.title.toLowerCase().includes(searchValue.toLowerCase());
            return isTitleMatches.length == 0 ? products : isTitleMatches;
        })
        .filter(product => {
            const productFromPrice = product.price
            return !fromValue ? true : productFromPrice >= fromValue;
        })
        .filter(product => {
            const productPrice = product.price;
            return !toValue ? true : productPrice <= toValue;
        })
        .sort((a, b) => {
            switch (sortValue) {
                case "1":
                    if (a.title > b.title) {
                        return 1
                    } else if (a.title === b.title) {
                        return 0
                    }
                    return -1;
                case "2":
                    return b.price - a.price;
                case "3":
                    return a.price - b.price;
                case "4":
                    return (new Date(b.birthDate).getTime()) - (new Date(a.birthDate).getTime())
                case "5":
                    return (new Date(a.birthDate).getTime()) - (new Date(b.birthDate).getTime())
                default:
                    break;
            }
            return 0;
        });

    renderProducts(filtredProducts);
})

// Favorites Btn Add

elParrotsWrapper.addEventListener('click', evt => {
    if (evt.target.matches('.btn-favourite')) {
        const clickedBtnId = +evt.target.dataset.id;
        const submittingItemIndex = products.find(product => product.id === clickedBtnId);
        const submittingItem = favorites.findIndex(product => product.id === clickedBtnId);
        if (submittingItemIndex.isFavorite == true) {
            submittingItemIndex.isFavorite = false;
            favorites.splice(submittingItem, 1)
        } else if(submittingItemIndex.isFavorite == false) {
            submittingItemIndex.isFavorite = true;
            favorites.push(submittingItemIndex)
        }
    }
    console.log(favorites);
    renderProducts()
})

const elFavouriteParrots = document.querySelector('#favorite-parrots');
const elFavouriteParrotsList = document.querySelector("#favorite-list");

const createFavouriteParrots = () => {
    const elFavorite = elFavouriteParrots.cloneNode(true).content;
    const elFavoriteCardTitle = elFavorite.querySelector('.favorite-title');
    const elFavoriteRemoveBtn = elFavorite.querySelector(".favorite-remove");
    elFavoriteCardTitle.textContent = favorites.title;
    elFavoriteRemoveBtn.textContent = 'Remove'
}

// Favorise aside

// favorites.forEach((parrot) => {
//     const elFavoriteParrotRows = createFavouriteParrots(parrot);
//     elFavouriteParrotsList.append(elFavoriteParrotRows);
// })





