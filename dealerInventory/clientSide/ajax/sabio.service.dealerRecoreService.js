if (!spright.services.dealerRecord)
    spright.services.dealerRecord = {}

// create vehicle
spright.services.dealerRecord.addRecord = function (payload, onSuccess, onError) {
    $.ajax({
        type: 'POST',
        data: payload,
        dataType: "json",
        url: '/api/DealerRecord',
        success: onSuccess,
        error: onError
    });
};

spright.services.dealerRecord.listRecords = function (payload,onSuccess, onError) {
    $.ajax({
        type: 'GET',
        data: payload,
        dataType: "json",
        url: '/api/DealerRecord',
        success: onSuccess,
        error: onError
    });
};

spright.services.dealerRecord.insertPictures = function (payload, onSuccess, onError) {
    $.ajax({
        type: 'POST',
        data: payload,
        dataType: "json",
        url: '/api/DealerRecord/insertPicture',
        success: onSuccess,
        error: onError
    });
};


spright.services.dealerRecord.getMediaByRecordID= function (recordID, onSuccess, onError) {
    $.ajax({
        type: 'GET',
        data: recordID,
        dataType: "json",
        url: '/api/DealerRecord/getPicture/' + recordID,
        success: onSuccess,
        error: onError
    });
};

spright.services.dealerRecord.setMainPicture = function (payload, onSuccess, onError) {
    $.ajax({
        type: 'POST',
        data: payload,
        dataType: "json",
        url: '/api/DealerRecord/SetMainPhoto',
        success: onSuccess,
        error: onError
    });
};

spright.services.dealerRecord.deleteRecordByDealerIdRecordId = function (recordID, onSuccess, onError) {
    $.ajax({
        type: 'DELETE',
        data: recordID,
        dataType: "json",
        url: '/api/DealerRecord/deleteRecord/' + recordID,
        success: onSuccess,
        error: onError
    });

};
// must use request model for the payload 
spright.services.dealerRecord.deleteMediaByMediaIdRecordId = function (payload, onSuccess, onError) {
    $.ajax({
        type: 'DELETE',
        data: payload,
        dataType: "json",
        url: '/api/DealerRecord/deleteMedia',
        success: onSuccess,
        error: onError
    });
}

    
    spright.services.dealerRecord.deleteVideoByMediaIdRecordId = function (payload, onSuccess, onError) {
        $.ajax({
            type: 'DELETE',
            data: payload,
            dataType: "json",
            url: '/api/DealerRecord/deleteVideo',
            success: onSuccess,
            error: onError
        });

};



