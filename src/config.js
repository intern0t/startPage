module.exports = {
    prefix: "sp_",
    google_favicon: "https://www.google.com/s2/favicons?domain=",
    cors_proxy: "https://api.codetabs.com/v1/proxy?quest=",
    name_openinnewtab: "openinnewtab",
    name_bookmarks: "bookmarks",
    name_24hours: "twentyfourhourclock",
    set_24hours: true,
    degree: "°",
    defaultBookmarksHeight: "255px",
    regex_domain_name: /:\/\/(.[^/]+)/,
    regex_url_validity: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    regex_site_title: /<title>(.*?)<\/title>/gm
};
