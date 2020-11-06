const mongoose = require('mongoose')
const { Schema } = mongoose
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Musisz wpisać nazwę użytkownika"],
        maxlength: [32, "Nazwa użytkownika może zawierać maksymalnie 32 znaki"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Musisz wpisać swój email"],
        unique: [true, "Ten email jest już używany"],
        validate: [isEmail, "Musisz wpisać prawidłowy email"]
    },
    password: {
        type: String,
        required: [true, "Musisz wpisać swoje hasło"],
        minlength: [6, "Hasło musi zawierać minimum 6 znaków"]
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email })
    if(user) {
      const auth = await bcrypt.compare(password, user.password)
      if(auth){
          return user
      }
      throw Error("Nieprawidłowy login lub hasło") 
    } else {
        throw Error("Nieprawidłowy login lub hasło")
    }
}

const User = mongoose.model('user', userSchema)

module.exports = User