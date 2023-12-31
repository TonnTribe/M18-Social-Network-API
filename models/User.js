const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required.',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required.',
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;
