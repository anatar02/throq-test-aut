import { element, by, browser, ExpectedConditions, protractor } from "protractor";
import { defineSupportCode, CallbackStepDefinition, Scenario, TableDefinition } from "cucumber";
import * as colors from "colors/safe";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as json from "json-file";
import * as fs from "fs";
import { async } from "q";
chai.use(chaiAsPromised);
let assert = chai.assert;

const expect: Chai.ExpectStatic = chai.expect;

defineSupportCode(function ({ Given, When, Then }): any {


  Then(/^The job is nice$/,
    async () => {
      // Write code here that turns the phrase above into concrete actions
      try {

      } catch (error) {

      }
    });

  Then(/^I have first task$/,
    async () => {
      // Write code here that turns the phrase above into concrete actions
      try {

      } catch (error) {
      }
    });

  When(/^Step from First Hello in Background Feature feature file$/,
    async () => {
      // Write code here that turns the phrase above into concrete actions
      try {

      } catch (error) {

      }
    });


  Then(/^I attempt to solve it$/,
    async () => {
      // Write code here that turns the phrase above into concrete actions
      try {

      } catch (error) {

      }
    });

  When(/^I surely succeed$/,
    async () => {
      // Write code here that turns the phrase above into concrete actions
      try {

      } catch (error) {

      }
    });

  When(/^I have third task$/,
    async () => {
      // Write code here that turns the phrase above into concrete actions
      try {

      } catch (error) {
      }
    });

  Then(/^I have second task$/,
    async () => {
      try {

      } catch (error) {
      }
    });

  When(/^I get paid$/,
    async () => {
      try {

      } catch (error) {
      }
    });
  When(/^Step from First Hello in Data Tables Feature feature file$/,
    async () => {
      try {

      } catch (error) {
      }
    });


  When(/^I have "([^"]*)" task$/,
    async (setValue: string) => {
      try {
        console.log("Hellow " + setValue)
      } catch (error) {
      }
    });

    When(/^Step from "([^"]*)" in "([^"]*)" feature file$/,
    async (setValue: string,getValue: string) => {
      try {
        console.log("Hellow " + setValue+"####"+getValue)
      } catch (error) {
      }
    });

    When(/^I surely receive a prize$/,
    async () => {
      try {
     
      } catch (error) {
      }
    });

    When(/^What i am "([^"]*)" tested$/,
    async (setValue: string) => {
        expect(setValue).to.eqls("Yes");
   
    });

});

