export function isPost(jsonData: any) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'html') &&
        Object.prototype.hasOwnProperty.call(jsonData, 'title') && Object.prototype.hasOwnProperty.call(jsonData, 'slug');
}

export function isNewsletter(jsonData: any) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'name') &&
        Object.prototype.hasOwnProperty.call(jsonData, 'subscribe_on_signup') && Object.prototype.hasOwnProperty.call(jsonData, 'visibility');
}

export function isPage(jsonData: any = {}) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'show_title_and_feature_image');
}

export function isTag(jsonData: any) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'name') && Object.prototype.hasOwnProperty.call(jsonData, 'slug') &&
        Object.prototype.hasOwnProperty.call(jsonData, 'description') && Object.prototype.hasOwnProperty.call(jsonData, 'feature_image');
}

export function isUser(jsonData: any) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'bio') && Object.prototype.hasOwnProperty.call(jsonData, 'website') &&
    Object.prototype.hasOwnProperty.call(jsonData, 'profile_image') && Object.prototype.hasOwnProperty.call(jsonData, 'location');
}

export function isNav(jsonData: any) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'label') && Object.prototype.hasOwnProperty.call(jsonData, 'url') &&
    Object.prototype.hasOwnProperty.call(jsonData, 'slug') && Object.prototype.hasOwnProperty.call(jsonData, 'current');
}
