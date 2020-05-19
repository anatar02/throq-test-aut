import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { element, by, browser, ExpectedConditions, Config } from "protractor";
import * as fs from "fs-extra";
import { defineSupportCode, Scenario, CallbackStepDefinition } from "cucumber";
import * as reporter from "sm-cucureport";
import * as path from "path";
import * as json from "json-file";
import colors = require("colors/safe");
import dateFormat = require("dateformat");
import * as cmd from "node-cmd";
import * as sleep from "system-sleep";
import * as gulp from "gulp";
import * as merge from "gulp-merge-json";
import * as runid from "shortid";
import * as user from "username";
const cliArg: any = require("yargs").argv;
const expect: Chai.ExpectStatic = chai.expect;
dateFormat.masks.runTime = "ddd_mmm_dd_yyyy_HH_MM_TT_Z";
chai.use(chaiAsPromised);
let browserParam = cliArg.browser;
let setNativeRun = cliArg.runmode;

export let config: Config = {
  // ****************************************************************************
 
  // ---- To connect directly to Drivers only for chrome & ff ---------------
  // ****************************************************************************
  directConnect: false,
  ignoreUncaughtExceptions: true,
 
  disableChecks: true,
  // ****************************************************************************
  // ----- Features to RUN ---------------------------------------------------
  // ****************************************************************************
  noGlobals: false,
 
  specs: [
    "../*/features/*.feature"
  ], 
// ****************************************************************************
// ----------------- Capabilities (Same Browser - Same Version) --------------
// ****************************************************************************

capabilities: {
  loggingPrefs: {
    browserName: browserParam
  },
  chromeOptions: {
    prefs: {
      "credentials_enable_service": false,
      "profile": {
        "password_manager_enabled": false
      }
    },
    args: [
      "--disable-cache",
      "--disable-infobars",
      "--disable-application-cache",
      "--disable-offline-load-stale-cache",
      "--disk-cache-size=0",
      "--v8-cache-options=off"
    ],
  },

  // safari Browser Specific Options
  "safari.options": {
    technologyPreview: true,
    "Allow Remote Automation": true
  },
  perfLoggingPrefs: {
    enableNetwork: true,
    enablepage: true
  },
  enableElementCacheCleanup: true,
  javascriptEnabled: true,
  ignoreProtectedModeSettings: true,
  logName: "atdd-enterprise-testFramework",
  count: 1, // number of same browser instances to run in parallel with same configurations
  shardTestFiles: true, // this is only needed if above is true
  maxInstances: 1, // this says....how many instances of same version of browser can run
},
  // ****************************************************************************
  // ----------------- Muilti Capabilities (Different Browsers & Versions) ------

  // please note that if multiCapabilities is defined, the runner will ignore the
  // capabilities configuration
  // ******************************************************************************
  multiCapabilities: [
    {
    browserName: browserParam
    },  
  ],

  // ****************************************************************************
  // -------------------- Global test information -----------------------------
  // ****************************************************************************
  allScriptsTimeout: 300000,
  getPageTimeout: 300000,
  untrackOutstandingTimeouts: false,
  // useBlockingProxy: true,
  // webDriverLogDir: "logs",
  // highlightDelay: 2000,

  // Merge all the test data files and write in the /test-data/data.json
  beforeLaunch: (): any => {
  
  },

  onPrepare: () => {

    colors.setTheme({
      silly: "rainbow",
      input: "grey",
      verbose: "cyan",
      prompt: "grey",
      info: "green",
      data: "grey",
      help: "cyan",
      warn: "yellow",
      debug: "blue",
      error: "red",
      custom: ["red", "underline"]
    });

   
    // maximize the browser before executing the feature files
    browser.driver.manage().window().maximize();
    /***************************************************************************
    Description: Declaration of environments
    ***************************************************************************/
    const environments: any = json.read(browser.params.datapath + "/environments.json");
    // ****************************************************************************
    // ----  Switch Case Statement to select the environment ---------------------
    // ****************************************************************************
    try {
      switch ((cliArg.env).toLowerCase()) {
        case "qamb":
          browser.baseUrl = environments.get("environments.qamb");
          break;
        case "local":
          browser.baseUrl = environments.get("environments.local");
          break;
          case "dev":
            browser.baseUrl = environments.get("environments.dev");
            break;
        default:
          throw new Error(
            // err.name + "\n" +
            "******************************************************************************************" + "\n" +
            "Invalid environment argument ==> " + cliArg.env + "\n" +
            "Availble environments are ==> local/dev/qamb/qambmob/regression/regressionmob/prod/prodmob" + "\n" +
            "******************************************************************************************");
      }
    } catch (err) {
      throw new Error(
        err.name + "\n" +
        "******************************************************************************************" + "\n" +
        "Invalid environment argument ==> " + cliArg.env + "\n" +
        "Availble environments are ==> local/dev/qamb/qambmob/regression/regressionmob/prod/prodmob" + "\n" +
        "******************************************************************************************");
    }
  },

  afterLaunch: (): any => {

    let options: any = {
      theme: "bootstrap",

      jsonFile: path.resolve(process.cwd()) + "/reports/global/json/" + cliArg.testsuiterunid + "_" +
        dateFormat(Date(), "runTime") + ".json",

      output: path.resolve(process.cwd()) + "/reports/global/html/" + cliArg.testsuiterunid + "_" +
        dateFormat(Date(), "runTime") + ".html",

      ignoreBadJsonFile: false,
      name: "ads-throq-atdd",
      storeScreenShots: true,
      reportSuiteAsScenarios: true,
      launchReport: true,

      // mock Data : This may be deleted since all these details we are tracking in dashboard
      metadata: {
        "Test Run ID": browser.params.testRunID,
        "App Name": "Throq Web App",
        "Test Environment": "Production URL",
        "Browser": "Chrome v74",
        "Platform": "Windows 10 OS",
        "Parallel": "NA",
        "Executed": "NA",
        "Run Date": dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
      }
    };

    //console.log(options);
    reporter.generate(options);

  },

  /***************************************************************************
  Description: Declaration of Global Params
  ***************************************************************************/

  params: {
    path: process.cwd(),
    stepspath: path.resolve(process.cwd()),
    datapath: path.resolve(process.cwd()),
    pagespath: path.resolve(process.cwd()) + "/objects/pages",
    modalspath: path.resolve(process.cwd()) + "/objects/modals",
    utilpath: path.resolve(process.cwd()) + "/utilities",
    hookspath: path.resolve(process.cwd()) + "/reports/global/json/" + cliArg.testsuiterunid + "_",
  },

  // ****************************************************************************
  // -------------------- The Cucumber JS Configurations       -----------------
  // ****************************************************************************
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  // ****************************************************************************
  // -------------------- Cucumber Options  like @tags, @formats ---------------
  // ****************************************************************************
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    monochrome: true,
    plugin: ["pretty"],
    strict: true,
    format: ["pretty"],
    keepAlive: true,
    require: [
      path.resolve(process.cwd()) + "/steps/*.ts",
      path.resolve(process.cwd()) + "/steps/*/*.ts",
      path.resolve(process.cwd()) + "/test-data/*.json",
      path.resolve(process.cwd()) + "/objects/*/*.ts",
      path.resolve(process.cwd()) + "/utilities/*.ts"
    ],
    tags: "@demo or @regression or @smoke"
  }

};
