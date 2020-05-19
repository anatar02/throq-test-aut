import * as cucumber from "cucumber";
import { element, by, browser, ExpectedConditions, Config } from "protractor";
import * as fs from "fs-extra";
import {
  defineSupportCode, Scenario, Feature, Step,
  HookScenarioResult, CallbackStepDefinition,
  JsonFormatter, HookOptions, SupportCodeConsumer, HookCode, EventListener
} from "cucumber";
import * as reporter from "sm-cucureport";

import * as path from "path";
import * as json from "json-file";
import * as dateFormat from "dateformat";
dateFormat.masks.runTime = "ddd_mmm_dd_yyyy_HH_MM_TT_Z";


const cliArg: any = require("yargs").argv;
defineSupportCode(({
  registerHandler,
  registerListener,
  After,
  Before,
  setDefaultTimeout }): void => {

  setDefaultTimeout(10 * 90000);

  registerHandler("BeforeFeatures", (events: any, callback: CallbackStepDefinition): any => {
    browser.getCapabilities().then((cap) => {
     
    })
    callback();
  });
  registerHandler("BeforeFeature", (event: any, callback: CallbackStepDefinition): any => {

    callback();
  });

  Before(function (scenario: any, callback: CallbackStepDefinition): any {
    let world: any = this;
    callback();
  });

  registerHandler("BeforeScenario", (scenario: any, callback: CallbackStepDefinition): any => {
    let world: any = this;
    world.scenario = scenario;
    const scenarioName = scenario.name;
   
    callback();
  });

  registerHandler("BeforeStep", (scenario: any, callback: CallbackStepDefinition): any => {
    callback();
  });

  registerHandler("AfterStep", (event: any, callback: CallbackStepDefinition): any => {
    callback();
  });

  registerHandler("StepResult", (event: any, callback: CallbackStepDefinition): any => {
    callback();
  });

  registerHandler("AfterScenario", (scenario: any, callback: CallbackStepDefinition): any => {

    let world: any = this;
    world.scenario = scenario;
    const scenarioName = scenario.name;

    callback();
  });

  After(function (scenario: any): any {
    let world: any = this;
    if (!scenario.isFailed()) {
    return browser.takeScreenshot().then((screenShot: string) => {
      world.attach(screenShot, "image/png");
      scenario.results
      })
    }
    else{
      return browser.takeScreenshot().then((screenShot: string) => {
        world.attach(screenShot, "image/png");
        })
    }
  
  })


  registerHandler("ScenarioResult", (event: any, callback: CallbackStepDefinition): any => {
    callback();
  });

  registerHandler("AfterFeature", (event: any, callback: CallbackStepDefinition): any => {
    callback();
  });

  registerHandler("FeaturesResult", (event: any, callback: CallbackStepDefinition): any => {
    callback();
  });

  registerHandler("AfterFeatures", (features: any, callback: CallbackStepDefinition): any => {

    callback();
  });




  let smCucukeReport: any = (jsonString: any): any => {
    try {
      fs.writeFileSync(browser.params.hookspath + dateFormat(Date(), "runTime") + ".json", jsonString);
    } catch (err) {
      if (err) {
        console.log(`Failed to save cucumber test results to json file.
                             Failed to create html report.
                             `);
        console.log(err);
      }
    }
  };
  let jsonformatter: any = new cucumber.JsonFormatter({
    log: smCucukeReport,
  });

  registerListener(jsonformatter);
});
