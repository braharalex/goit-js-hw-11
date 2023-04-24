import './css/style.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import fetchImage from './js/axios';
import galleryCard from './js/template/gallery';

let page = 1;
let allPages = 1;
const perPage = 40;
let queryParams;
let isLoading = false;

const refs = {
  srchForm: document.querySelector('#search-form'),
  srchBtn: document.querySelector('.search-btn'),
  gallery: document.querySelector('.gallery'),
};

refs.srchForm.addEventListener('submit', onSubmit);

const gallery = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  disableRightClick: true,
  overlayOpacity: 0.85,
});

function onSubmit(e) {
  e.preventDefault();
  document.addEventListener('scroll', onScroll);

  const formElem = e.target.elements;
  queryParams = formElem.searchQuery.value.trim();

  if (queryParams == '') {
    Notify.warning('Please enter a request...')
    return;
  }

  removeGalleryItems();
  renderGalleryItems(queryParams, page, perPage);
}

async function renderGalleryItems(query, qPage, perPage) {
  try {
    const { data } = await fetchImage(query, qPage, perPage);

    allPages = Math.ceil(data.totalHits / perPage);

    showRenderMessage(data.totalHits, page);

    if (!data.totalHits) return;

    refs.gallery.insertAdjacentHTML('beforeend', await galleryCard(data));
    gallery.refresh();

    page += 1;
    isLoading = false;
  } catch (err) {
    Notify.failure(`Error ${err.message}`);
  }
}

function removeGalleryItems() {
  refs.gallery.textContent = '';
  page = 1;
}

function showRenderMessage(total, page) {
  if (!total) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (page == 1) {
    Notify.success(`Hooray! We found ${total} images`);
  }
}

function onScroll(e) {
  const scrollHeight = e.target.documentElement.scrollHeight;
  const scrollTop = e.target.documentElement.scrollTop;
  const clientHeight = e.target.documentElement.clientHeight;

  if (scrollHeight - (scrollTop + clientHeight) > 400 || isLoading) {
    return;
  }

  if (allPages < page) {
    Notify.success("We're sorry, but you've reached the end of search results.");
    document.removeEventListener('scroll', onScroll);
    return
  }

  isLoading = true;
  renderGalleryItems(queryParams, page, perPage);
}
