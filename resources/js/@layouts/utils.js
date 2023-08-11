export const openGroups = ref([])

/**
 * Return nav link props to use
 * @param {Object, String} item navigation routeName or route Object provided in navigation data
 */
export const getComputedNavLinkToProp = computed(() => link => {
    const props = {
        target: link.target,
        rel: link.rel,
    }

    // If route is string => it assumes string is route name => Create route object from route name
    // If route is not string => It assumes it's route object => returns passed route object
    if (link.to)
        props.to = link.to
    else
        props.href = link.href

    return props
})

/**
 * Check if nav-link is active
 * @param {Object} link nav-link object
 * @param pageUrl
 */
export const isNavLinkActive = (link, pageUrl) => {
    let url = null;
    try {
        url = new URL(link)
    } catch (e) {
    }

    return pageUrl === url?.pathname || pageUrl === url;
}

/**
 * Check if nav group is active
 * @param {Array} children Group children
 * @param pageUrl
 */
export const isNavGroupActive = (children, pageUrl) => children.some(child => {
    // If child have children => It's group => Go deeper(recursive)
    if ('children' in child)
        return isNavGroupActive(child.children, pageUrl)

    // else it's link => Check for matched Route
    return isNavLinkActive(child, pageUrl)
})

/**
 * Convert Hex color to rgb
 * @param hex
 */
export const hexToRgb = hex => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
}

/**
 ** RGBA color to Hex color with / without opacity
 */
export const rgbaToHex = (rgba, forceRemoveAlpha = false) => {
    return (`#${rgba
        .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map(string => parseFloat(string)) // Converts them to numbers
        .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
        .map(number => number.toString(16)) // Converts numbers to hex
        .map(string => (string.length === 1 ? `0${string}` : string)) // Adds 0 when length of one number is 1
        .join('')}`)
}
