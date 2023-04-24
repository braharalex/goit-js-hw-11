export default async function ({ hits }) {
  return hits
    .map(
      ({
        comments,
        likes,
        views,
        webformatURL: image,
        largeImageURL: fullImage,
        downloads,
        tags,
      }) => {
        return `<div class="photo-card">
          <a href="${fullImage}">
            <img src="${image}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b> <br>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b> <br>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b> <br>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b> <br>
                ${downloads}
              </p>
            </div>
          </a>
        </div>`;
      }
    )
    .join('');
}
