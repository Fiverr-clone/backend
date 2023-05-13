const express = require("express");
const router = express.Router();

const subCategoryController = require("../controllers/sub_category");
//category online courses
router.get(
	"/online-courses/learn-programming",
	subCategoryController.onlineCoursesLearnProgramming
);
router.get(
	"/online-courses/learn-digital-marketing",
	subCategoryController.onlineCoursesLearnDigitalMarketing
);
router.get(
	"/online-courses/learn-english",
	subCategoryController.onlineCoursesLearnEnglish
);
router.get(
	"/online-courses/learn-french",
	subCategoryController.onlineCoursesLearnFrench
);
//Digital marketing
router.get('/digital-marketing/website-ads', subCategoryController.digitalMarketingWebsiteAds);
router.get('/digital-marketing/content-marketing', subCategoryController.digitalMarketingContentMarketing);
router.get('/digital-marketing/instagram-marketing', subCategoryController.digitalMarketingInstagramMarketing);
router.get('/digital-marketing/facebook-marketing', subCategoryController.digitalMarketingFacebookMarketing);
//Writing & translating 
router.get('/writing-translation/translation-services', subCategoryController.writingTranslationTranslationServices);
router.get('/writing-translation/summarising-services', subCategoryController.writingTranslationSummarisingServices);
router.get('/writing-translation/sales-copy', subCategoryController.writingTranslationSalesCopy);
router.get('/writing-translation/scriptwriting', subCategoryController.writingTranslationScriptwriting);
//Design 
router.get('/design/book-cover-design', subCategoryController.designBookCoverDesign);
router.get('/design/business-card-design', subCategoryController.designBusinessCardDesign);
router.get('/design/presentation-design', subCategoryController.designPresentationDesign);
router.get('/design/photo-editing-services', subCategoryController.designPhotoEditingServices);
//PROGRAMMING & DEVELOPMENT 
router.get('/programming-development/css-html-programming', subCategoryController.programmingDevelopmentCssHtmlProgramming);
router.get('/programming-development/java-dot-net-programming', subCategoryController.programmingDevelopmentJavaDotNetProgramming);
router.get('/programming-development/php-programming', subCategoryController.programmingDevelopmentPhpProgramming);
router.get('/programming-development/python-programming', subCategoryController.programmingDevelopmentPythonProgramming);
router.get('/programming-development/mobile-app-programming', subCategoryController.programmingDevelopmentMobileAppProgramming);
router.get('/programming-development/wordpress-services', subCategoryController.programmingDevelopmentWordpressServices);
// GET subcategory by ID and populate category
router.get("/:id", subCategoryController.getSubCategoryById);

module.exports = router;
