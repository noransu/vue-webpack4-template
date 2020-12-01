import '../assets/css/modal.less';

function hasClass(elem, className) {
  className = className || '';
  if (className.replace(/\s/g, '').length === 0) return false; // 当 className 没有参数时，返回false
  return new RegExp(` ${className} `).test(` ${elem.className} `);
}

function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className = elem.className === '' ? className : `${elem.className} ${className}`;
  }
}

function removeClass(elem, className) {
  if (hasClass(elem, className)) {
    let newClass = ` ${elem.className.replace(/[\t\r\n]/g, '')} `;
    while (newClass.indexOf(` ${className} `) >= 0) {
      newClass = newClass.replace(` ${className} `, ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

// function toggleClass(obj, cls) {
//     hasClass(obj, cls) ? removeClass(obj, cls) : addClass(obj, cls);
// }

class ModalHelper {
  static defaultOptions = {
    modalClass: 'modal-helper-open',
    withInput: false,
  };

  // eslint-disable-next-line class-methods-use-this
  defaults(options) {
    return { ...ModalHelper.defaultOptions, ...options };
  }

  constructor(options) {
    this.body = document.body;
    this.scrollTop = 0;
    this.options = this.defaults(options);
  }

  blockScroll() {
    const self = this;
    self.scrollTop = this.getScrollTop();
    addClass(this.body, this.options.modalClass);
    if (!this.options.withInput) {
      this.body.style.top = -self.scrollTop;
    }
  }

  unBlockScroll() {
    const self = this;
    removeClass(self.body, self.options.modalClass);
    this.setScrollTop(self.scrollTop);
    this.body.style.top = 0;
  }

  getScrollTop() {
    if (document.documentElement.scrollTop > 0) {
      this.scrollTopElem = document.documentElement;
      return document.documentElement.scrollTop;
    }
    this.scrollTopElem = document.body;
    return document.body.scrollTop;
  }

  setScrollTop(top) {
    if (this.scrollTopElem) {
      // eslint-disable-next-line no-return-assign
      return (this.scrollTopElem.scrollTop = top);
    }
    return 0;
  }

  toggleBlock(isBlock) {
    // eslint-disable-next-line no-unused-expressions
    isBlock ? this.blockScroll() : this.unBlockScroll();
  }
}

export default ModalHelper;
