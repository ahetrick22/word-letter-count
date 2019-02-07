const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);