const $siteList = $('.siteList');
const $lastLi = $siteList.find('.last');
const site = localStorage.getItem('site');
const initialSite = [
  {
    logo: 'A',
    url: 'https://www.acfun.cn',
    logoType: 'text',
    title: 'acfun.cn'
  },
  {
    logo: 'http://img5.imgtn.bdimg.com/it/u=2950647569,1131126252&fm=26&gp=0.jpg',
    url: 'https://bilibili.com',
    logoType: 'image',
    title: 'bilibili.com'
  }
];
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}
let hashMap = JSON.parse(site) || initialSite;

const renderSiteList = () => {
  $siteList.find('li:not(.last)').remove();

  hashMap.map(({ logo, url, logoType, title }, index) => {
    const $li = $(`<li>
      <a href='${url}'>
        <div class="site">
          <div class="logo">
            ${logoType === 'image' ? `<img src = ${logo} />` : logo}
          </div>
          <div class="link">${title}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`).insertBefore($lastLi)

    $li.on('click', '.close', (e) => {
      hashMap.splice(index, 1);
      renderSiteList();

      e.stopPropagation();
      e.preventDefault();
    });
  });
};

const renderModal = () => {
  const $modal  = $(`<modal class="modalContainer">
    <div class="modalWrapper">
      <form class="modalForm">
        <label>Website Address</label>
        <input type="text" name="address" placeholder="Please enter website address" />
        <label>Website Logo</label>
        <input type="text" name="logo" placeholder="Please enter website logo address" />
        <label>Website Title</label>
        <input type="text" name="title" placeholder="Please enter website title" />
        <button type="submit">
          Submit
        </button>
      </form>
      <div class="close">
        <svg class="icon">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
  </modal>`).appendTo('body')

  $modal.on('click', '.close', (e) => {
    $modal.remove();
  })

  $modal.on('click', 'button', () => {
    let webSite = {};
    let url = $(" input[ name='address' ] ").val();

    if(url.indexOf('http') !== 0) {
      url = `https://${url}`
    }

    webSite['title'] = $(" input[ name='title' ] ").val();
    webSite['url'] = url
    webSite['logo'] = $(" input[ name='logo' ] ").val() || simplifyUrl(url)[0];
    webSite['logoType'] = $(" input[ name='logo' ] ").val() ? 'image' : 'text';

    hashMap = [...hashMap, webSite];

    $modal.remove();
    renderSiteList();
  })
};

renderSiteList();


$('.addButton').on('click', () => {
  renderModal();
});

window.onbeforeunload = () => {
  localStorage.setItem('site', JSON.stringify(hashMap))
};