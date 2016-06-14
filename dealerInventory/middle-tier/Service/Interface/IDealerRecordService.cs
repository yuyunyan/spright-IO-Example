using Sabio.Web.Domain.EVA;
using Sabio.Web.Models.Requests;
using Sabio.Web.Models.Requests.EVA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sabio.Web.Services.Interfaces
{
    public interface IDealerRecordService
    {
        int InsertRecord(DealerRecordAddRequest model);
        List<EVA_Record> ListVehicleRecordByDealerID(int DealerID, PaginateListRequestModel model);
        int GetVehicleRecord_Count(int DealerID);
        int InsertDealerRecordMedia(DealerRecordMediaRequest model);
        List<Domain.EVA.DealerRecordMedia> GetMediasByRecordId(int recordID);
        void setMainPhoto(RecordMediaSetMainPhoto model);
        void DeleteByID(int DealerID, int RecordID);
        void DeleteMediaByID(DealerRecordMediaRequest model);
        void DeleteVideoByID(DealerRecordMediaRequest model);

    }
}