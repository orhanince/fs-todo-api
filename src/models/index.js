'use strict';
/*
 * how to use!
 *
 * for example Customer model in models/customer.js
 *
 * const Customer = required('./models/customer.js');
 *
 * module.exports = {
 *   Customer,
 *   ...OtherModels
 * };
 */

const { User } = require('./user');
const { Form } = require('./form');
const { FormPageView } = require('./form-pageview');
const { FormReply } = require('./form-reply');
const { PricingPackage } = require('./pricing-package');
const { FormTemplate } = require('./form-template');
const { BlogCategory } = require('./blog-category');
const { BlogPost } = require('./blog-post');
const { UserPackage } = require('./user-package');
module.exports = {
  User,
  Form,
  FormPageView,
  FormReply,
  PricingPackage,
  FormTemplate,
  BlogCategory,
  BlogPost,
  UserPackage,
};
