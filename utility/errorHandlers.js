exports.handleErrors = (err) => {
    let error = { email: '', password: '', name: '', response: '' }

    if (err.code === 11000) {
        error.email = "Ten email już jest używany"
        return error
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message
        })
    }
    
    if(err.message === 'Nieprawidłowy login lub hasło') {
        error.response = err.message
    }

    return error
} 

exports.handleCategoryErrors = (err) => {
    let error = { response: '' }

    if (err.code === 11000) {
        error.response = "Taka kategoria już istnieje"
        return error
    }

    if(err.message.includes('category validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            error.response = properties.message
        })
    }

    return error
} 

exports.handleProductErrors = (err) => {
    let error = { response: '' }

    if (err.code === 11000) {
        error.response = "Taki produkt już istnieje"
        return error
    }

    if(err.message.includes('product validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            error.response = properties.message
        })
    }

    return error
} 