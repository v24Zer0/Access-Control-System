const indexed_data = [
    {
        "6C4E2C5D-BBBB-4386-AA71-B7F56727433C": {
            name: "Wonka Factory",
            parent_area: null,
            child_area_ids: [
                "CBB8569D-C331-4629-A1F7-236BFA1A2822"
            ],
            doors: [
                "126A73D3-2148-4DA9-9332-867571884AA1",
                "094F5C91-0E13-4712-8382-1B4B829C4111",
                "4415D5B1-AA7D-4732-BEA6-99B610B2FDBF"
            ]
        },
        "CBB8569D-C331-4629-A1F7-236BFA1A2822": {
            name: "Chocolate Room",
            parent_area: "6C4E2C5D-BBBB-4386-AA71-B7F56727433C",
            child_area_ids: [
                "F29B9474-CABC-46E3-8B75-66281ABFBA92"
            ],
            doors: []
        },
        "F29B9474-CABC-46E3-8B75-66281ABFBA92": {
            name: "Sugargrass Meadows",
            parent_area: "CBB8569D-C331-4629-A1F7-236BFA1A2822",
            child_area_ids: [],
            doors: []
        }
    },
    {
        "126A73D3-2148-4DA9-9332-867571884AA1": {
            name: "Main Gate",
            status: "open",
            access_rules: [
                "sar-wonka"
            ]
        },
        "094F5C91-0E13-4712-8382-1B4B829C4111": {
            name: "Factory Front Door",
            status: "open",
            access_rules: [
                "sar-wonka"
            ]
        },
        "4415D5B1-AA7D-4732-BEA6-99B610B2FDBF": {
            name: "Factory Back Door",
            status: "closed",
            access_rules: [
                "sar-wonka"
            ]
        }
    }
];

module.exports = indexed_data;