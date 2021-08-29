const system_data = {
    areas: [
        {
            _id: "6C4E2C5D-BBBB-4386-AA71-B7F56727433C",
            name: "Wonka Factory",
            parent_area: null,
            child_area_ids: [
                "CBB8569D-C331-4629-A1F7-236BFA1A2822"            
            ]
        },
        {
            _id: "CBB8569D-C331-4629-A1F7-236BFA1A2822",
            name: "Chocolate Room",
            parent_area: "6C4E2C5D-BBBB-4386-AA71-B7F56727433C",
            child_area_ids: [
                "F29B9474-CABC-46E3-8B75-66281ABFBA92"
            ]
        },
        {
            _id: "F29B9474-CABC-46E3-8B75-66281ABFBA92",
            name: "Sugargrass Meadows",
            parent_area: "CBB8569D-C331-4629-A1F7-236BFA1A2822",
            child_area_ids: []
        }
    ],
    doors: [
        {
            _id: "126A73D3-2148-4DA9-9332-867571884AA1",
            name: "Main Gate",
            parent_area: "6C4E2C5D-BBBB-4386-AA71-B7F56727433C",
            status: "open"
        },
        {
            _id: "094F5C91-0E13-4712-8382-1B4B829C4111",
            name: "Factory Front Door",
            parent_area: "6C4E2C5D-BBBB-4386-AA71-B7F56727433C",
            status: "open"
        },
        {
            _id: "4415D5B1-AA7D-4732-BEA6-99B610B2FDBF",
            name: "Factory Back Door",
            parent_area: "6C4E2C5D-BBBB-4386-AA71-B7F56727433C",
            status: "closed"
        }
    ],
    access_rules: [
        {
            _id: "A81EAF69-E737-4DCB-925A-B4F27BD3C119",
            name: "sar-wonka",
            doors: [
                "126A73D3-2148-4DA9-9332-867571884AA1",
                "094F5C91-0E13-4712-8382-1B4B829C4111",
                "4415D5B1-AA7D-4732-BEA6-99B610B2FDBF"
            ]
        }
    ]
}

module.exports = system_data;