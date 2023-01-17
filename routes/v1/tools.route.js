const express = require("express");
const router = express.Router();
const toolsController = require("../.././controllers/tools.controller");
const limiter = require("../../middleware/limiter");
const viewCount = require("../../middleware/viewCount");

// router.get("/:id", (req, res) => {
//   res.send("Tools get!");
// });
// router.post("/", (req, res) => {
//   res.send("tools post!");
// });

router
  .route("/")
  /**
   * API Documentation >> ................
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(toolsController.getAllTools)
  /**
   * API Documentation >> ................
   * @api {post} /tools save a tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(toolsController.saveATools);

  // test routes for indexing check database
router.route("/test").post(toolsController.test).get(toolsController.getTest);

router
  .route("/:id")
  .get(viewCount, toolsController.getToolsDetails)
  .patch(toolsController.updateTools)
  .delete(toolsController.deleteTools);

module.exports = router;
