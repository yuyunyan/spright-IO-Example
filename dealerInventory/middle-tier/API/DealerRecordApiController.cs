using Sabio.Web.Domain;
using Sabio.Web.Models.Requests;
using Sabio.Web.Models.Requests.EVA;
using Sabio.Web.Models.Responses;
using Sabio.Web.Services;
using Sabio.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace Sabio.Web.Controllers.Api.DealerRecord
{
    [RoutePrefix("api/DealerRecord")]
    public class DealerRecordApiController : ApiController
    {
        private IDealerRecordService _DealerRecordService { get; set; }
        private IDealerService _MainDealerService { get; set; }
        private IRecordServices _RecordServices { get; set; }
        public DealerRecordApiController(IDealerRecordService DealerRecordService, IDealerService MainDealerService, IRecordServices RecordServices)
        {
            _DealerRecordService = DealerRecordService;
            _MainDealerService = MainDealerService;
            _RecordServices = RecordServices;
        }

        [Route(""), HttpPost]
        [Authorize] //login in to get userID
        public HttpResponseMessage AddRecord(DealerRecordAddRequest model)
        {
            string CurrentUserId = UserService.GetCurrentUserId();
             Dealer MyDealer = _MainDealerService.GetByUserId(CurrentUserId);
            model.DealerID = MyDealer.Id;
            //model.DealerID = 10;
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = _DealerRecordService.InsertRecord(model);
            return Request.CreateResponse(response);
        }

        [Route(), HttpGet]
        public HttpResponseMessage GetVehicleRecordByDealerID([FromUri] PaginateListRequestModel model)
        {
            string CurrentUserId = UserService.GetCurrentUserId();
            Dealer Dealer = _MainDealerService.GetByUserId(CurrentUserId);


            if (model == null)
            {
                model = new PaginateListRequestModel();
                model.CurrentPage = 1;
                model.ItemsPerPage = 6;
                // /api/DealerRecord?currentPage=1&itemsPerPage=10 NOT NULL 
            }
            PaginateItemsResponse<Domain.EVA.EVA_Record> response = new PaginateItemsResponse<Domain.EVA.EVA_Record>();
            response.Items = _DealerRecordService.ListVehicleRecordByDealerID(Dealer.Id,model);
            response.CurrentPage = model.CurrentPage;
            response.ItemsPerPage = model.ItemsPerPage;
            response.TotalItems = _DealerRecordService.GetVehicleRecord_Count(Dealer.Id);

            return Request.CreateResponse(response);
        }

        [Route("insertPicture"), HttpPost]
        public HttpResponseMessage InsertPictures(DealerRecordMediaRequest model)
        {
            string CurrentUserId = UserService.GetCurrentUserId();
            Dealer Dealer = _MainDealerService.GetByUserId(CurrentUserId);
             model.DealerID = Dealer.Id;
            //model.DealerID = 10;

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = _DealerRecordService.InsertDealerRecordMedia(model);
            return Request.CreateResponse(response);
        }



        // get picture from relationship table 
        [Route("getPicture/{RecordID:int}"), HttpGet]
        public HttpResponseMessage getMediabyVehicleId(int RecordID)
        {
            ItemsResponse<Domain.EVA.DealerRecordMedia> response = new ItemsResponse<Domain.EVA.DealerRecordMedia>();
            response.Items = _DealerRecordService.GetMediasByRecordId(RecordID);
            return Request.CreateResponse(response);

        }

        [Route("SetMainPhoto"), HttpPost]
        public HttpResponseMessage SetAsMainPhoto(RecordMediaSetMainPhoto model)
        {
            // if the Model does not pass validation, there will be an Error response returned with errors
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            ItemResponse<bool> response = new ItemResponse<bool>(); //void cant be used in this context

            response.Item = true; //related with <bool> response 
            _DealerRecordService.setMainPhoto(model);

            RecordMediaSetMainPhoto requestModel = new RecordMediaSetMainPhoto();

            return Request.CreateResponse(response);
        }

        // Delete vehicle record by dealerID and recordID
        [Route("deleteRecord/{RecordID:int}"), HttpDelete]
        public HttpResponseMessage DeleteByID(int RecordID)
        {
            string CurrentUserId = UserService.GetCurrentUserId();

            Dealer Dealer = _MainDealerService.GetByUserId(CurrentUserId);

            SuccessResponse response = new SuccessResponse();

              _DealerRecordService.DeleteByID(Dealer.Id, RecordID);
            //_DealerRecordService.DeleteByID(10, RecordID);

            return Request.CreateResponse(response);
        }

        // Delete media  by  recordID and mediaID
        [Route("deleteMedia"), HttpDelete]
        public HttpResponseMessage DeleteByID(DealerRecordMediaRequest model)
        {

            SuccessResponse response = new SuccessResponse();

            _DealerRecordService.DeleteMediaByID(model);

            return Request.CreateResponse(response);
        }

        // Delete video  by  recordID and mediaID
        [Route("deleteVideo"), HttpDelete]
        public HttpResponseMessage DeleteVideoByID(DealerRecordMediaRequest model)
        {

            SuccessResponse response = new SuccessResponse();

            _DealerRecordService.DeleteVideoByID(model);

            return Request.CreateResponse(response);
        }

    }
}
