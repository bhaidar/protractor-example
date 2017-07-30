/**
 * Example tests of an Angular site
 */
import friendPage from '../pages/friendPage';
import Chance from 'chance';
const chance = new Chance();

describe ('angular app', () => {
	beforeEach(() => {
        friendPage.goto();

        expect(friendPage.loaded()).toBeTruthy();
	});

    it('should add a new friend', () => {
        const FRIENDNAME = chance.string();
        friendPage.addFriend(FRIENDNAME);

        expect(friendPage.inResults(FRIENDNAME)).toBeTruthy();
    });

    it('should delete an existing friend', () => {
        friendPage.deleteFriend('Paul');

        expect(friendPage.inResults('Paul')).toBeFalsy();
    });

    it('should not display non-found search terms', () => {
        friendPage.searchFor('poo!!!');

        expect(friendPage.rows.count()).toBe(0);
    });

    it('should display found search terms', () => {
        friendPage.searchFor('Paul');

        expect(friendPage.inResults('Paul')).toBeTruthy();
    });

    it('should display no rows when all friends deleted', () => {
        friendPage.deleteAllFriends();
        friendPage.loaded(); // protect against false positives...

        expect(friendPage.rows.count()).toBe(0);
    });

    it('should display actual count before saving new friend', () => {
        friendPage.addnameBox.sendKeys('Some text...');

        expect(friendPage.actualCount.getText()).toEqual('(only 3 actually....)');
    });
});
