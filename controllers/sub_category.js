const SubCategory = require('../models/sub_category');

exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const subCategory = await SubCategory.findById(subCategoryId).populate('category');
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//online courses 
exports.onlineCoursesLearnProgramming = (req, res) => {
    res.redirect('/online-courses/learn-programming');
  };
  
  exports.onlineCoursesLearnDigitalMarketing = (req, res) => {
    res.redirect('/online-courses/learn-digital-marketing');
  };
  
  exports.onlineCoursesLearnEnglish = (req, res) => {
    res.redirect('/online-courses/learn-english');
  };
  
  exports.onlineCoursesLearnFrench = (req, res) => {
    res.redirect('/online-courses/learn-french');
  };
//digital marketing 
exports.digitalMarketingWebsiteAds = (req, res) => {
    res.redirect('/digital-marketing/website-ads');
  };
  
  exports.digitalMarketingContentMarketing = (req, res) => {
    res.redirect('/digital-marketing/content-marketing');
  };
  
  exports.digitalMarketingInstagramMarketing = (req, res) => {
    res.redirect('/digital-marketing/instagram-marketing');
  };
  
  exports.digitalMarketingFacebookMarketing = (req, res) => {
    res.redirect('/digital-marketing/facebook-marketing');
  };
//writing & translating 
exports.writingTranslationTranslationServices = (req, res) => {
    res.redirect('/writing-translation/translation-services');
  };
  
  exports.writingTranslationSummarisingServices = (req, res) => {
    res.redirect('/writing-translation/summarising-services');
  };
  
  exports.writingTranslationSalesCopy = (req, res) => {
    res.redirect('/writing-translation/sales-copy');
  };
  
  exports.writingTranslationScriptwriting = (req, res) => {
    res.redirect('/writing-translation/scriptwriting');
  };

//design
exports.designBookCoverDesign = (req, res) => {
    res.redirect('/design/book-cover-design');
  };
  
  exports.designBusinessCardDesign = (req, res) => {
    res.redirect('/design/business-card-design');
  };
  
  exports.designPresentationDesign = (req, res) => {
    res.redirect('/design/presentation-design');
  };
  
  exports.designPhotoEditingServices = (req, res) => {
    res.redirect('/design/photo-editing-services');
  };
//programming and developement 
exports.programmingDevelopmentCssHtmlProgramming = (req, res) => {
    res.redirect('/programming-development/css-html-programming');
  };
  
  exports.programmingDevelopmentJavaDotNetProgramming = (req, res) => {
    res.redirect('/programming-development/java-dot-net-programming');
  };
  
  exports.programmingDevelopmentPhpProgramming = (req, res) => {
    res.redirect('/programming-development/php-programming');
  };
  
  exports.programmingDevelopmentPythonProgramming = (req, res) => {
    res.redirect('/programming-development/python-programming');
  };
  
  exports.programmingDevelopmentMobileAppProgramming = (req, res) => {
    res.redirect('/programming-development/mobile-app-programming');
  };
  
  exports.programmingDevelopmentWordpressServices = (req, res) => {
    res.redirect('/programming-development/wordpress-services');
  };
  
