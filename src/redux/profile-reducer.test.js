import { profileReducer, addPostActionCreator } from './profile-reducer';


describe('profileReducer', () => {
    // 1. test data
    const state = {

        posts: [
            { id: 1, message: 'My first post', like: 10, dislike: 0 },
            { id: 2, message: 'Hi, my new post', like: 20, dislike: 1 }
        ]
    };
    let newPostText = 'its new post text';

    // 2. action
    let action = addPostActionCreator(newPostText);
    let newState = profileReducer(state, action)


    it('length of posts in state', () => {

        // 3.expected
        expect(newState.posts.length).toEqual(3);
    });

    it('message of new post should be correct ', () => {

        // 3.expected
        expect(newState.posts[2]).toEqual(newPostText);
    });
})
