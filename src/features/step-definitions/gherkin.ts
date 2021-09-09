import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

let someState;

Given(/^I want to write functional tests$/, () => {
  someState = {};
});
When(/^I write one$/, () => {
  someState.someValue = true;
});
Then(/^it should assert something$/, () => {
  expect(someState.someValue).to.be.true;
});
