import dayjs from "dayjs"
import { Booking, BookingFitness, HistoryPrice, Inventory, PriceSuggestion, Property, Unit, UnitType } from "../@types"
import { Electricity } from "../@types/electricity"
import { DatatableColumn } from "../components/datatable/Datatable"
import { localDate, localDateWithTime, localTime, localTimeHM, rp, truncateString } from "../support/formater"
import { EventLog } from "../@types/eventlog"
import { InventoryByUnit } from "../@types/inventoryByUnit"
import { Log } from "../@types/log"

export const PROPERTY_TABLE_METADATA: DatatableColumn<Property>[] = [{
  key: "name",
  label: "Name",
}, {
  key: "address",
  label: "Address",
}, {
  className: "whitespace-nowrap",
  key: "createdAt",
  label: "Created At",
  render(value) {
    return localDate(value.createdAt)
  }
}]

export const UNIT_TYPE_TABLE_METADATA: DatatableColumn<UnitType>[] = [{
  key: "name",
  label: "Name",
}, {
  className: "whitespace-nowrap",
  key: "createdAt",
  label: "Created At",
  render(value) {
    return localDate(value.createdAt)
  }
}]

export const UNIT_LIST_TABLE_METADATA: DatatableColumn<Unit>[] = [{
  key: "name",
  label: "Unit Name",
}, {
  key: "unitTypeId",
  label: "Unit Type",
  render(value) {
    return value.unitType.name
  },
}, {
  key: "lastElectricity",
  label: "Last Electricity",
  render(value) {
    return value.lastElectricity ? `${value.lastElectricity.kwh} Kwh` : '-'
  },
}, {
  className: "whitespace-nowrap",
  key: "createdAt",
  label: "Created At",
  render(value) {
    return localDate(value.createdAt)
  }
}]

export const BOOKING_LIST_TABLE_METADATA_DAILY: DatatableColumn<Booking>[] = [{
    className: 'whitespace-nowrap',
    key: "id",
    label: "Id"
  }, {
    className: 'whitespace-nowrap',
    key: "customer.name",
    label: "Guest Name",
    render: (value) => {
      return value.customer.name
    }
  }, {
    className: 'whitespace-nowrap',
    key: "price",
    label: "Price",
    render(value) {
      return rp(value.price)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "bookingDate",
    label: "Booking Date",
    render(value) {
      return localDate(value.bookingDate)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "checkInDate",
    label: "Check In",
    render(value) {
      return localDate(value.checkInDate)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "checkOutDate",
    label: "Check Out",
    render(value) {
      return localDate(value.checkOutDate)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "unitType.name",
    label: "Unit Type",
    render(value) {
      return value.unitType.name
    },
  }, {
    className: 'whitespace-nowrap',
    key: "assignedUnit",
    label: "Unit",
  }, {
    key: "otaExtrasOrigin",
    label: "Origin",
    render(value) {
      return value.otaExtras ? value.otaExtras.name : '-'
    }
  }, {
    key: "otaExtrasRef",
    label: "Ref",
    render(value) {
      return value.otaExtras ? value.otaExtras.ref : '-'
    }
  }, {
    className: 'whitespace-nowrap',
    key: "createdAt",
    label: "Created At",
    render(value) {
      return localDate(value.createdAt)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "bookingTime",
    label: "Booking Time",
    render(value) {
      return localTime(value.createdAt)
    },
}]

export const BOOKING_LIST_TABLE_METADATA_MONTHLY: DatatableColumn<Booking>[] = [{
    className: 'whitespace-nowrap',
    key: "id",
    label: "Id"
  }, {
    className: 'whitespace-nowrap',
    key: "customer.name",
    label: "Guest Name",
    render: (value) => {
      return value.customer.name
    }
  }, {
    className: 'whitespace-nowrap',
    key: "price",
    label: "Price",
    render(value) {
      return rp(value.price)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "bookingDate",
    label: "Booking Date",
    render(value) {
      return localDate(value.bookingDate)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "checkInDate",
    label: "Check In",
    render(value) {
      return localDate(value.checkInDate)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "checkOutDate",
    label: "Check Out",
    render(value) {
      return localDate(value.checkOutDate)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "unitType.name",
    label: "Unit Type",
    render(value) {
      return value.unitType.name
    },
  }, {
    className: 'whitespace-nowrap',
    key: "assignedUnit",
    label: "Unit",
    // render(value) {
    //   return value.unitType.name
    // },
  }, {
    className: 'whitespace-nowrap',
    key: "createdAt",
    label: "Created At",
    render(value) {
      return localDate(value.createdAt)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "bookingTime",
    label: "Booking Time",
    render(value) {
      return localTime(value.createdAt)
    },
  }, {
    className: 'whitespace-nowrap',
    key: "subcription",
    label: "Subscription",
    render(value) {
      return value.subscription ? 'True' : 'False'
    },
}]

export const ELECTRICITY_METER_LIST_TABLE_METADATA: DatatableColumn<Electricity>[] = [
  {
    key: "kwh",
    label: "Kwh",
  },
  {
    key: "createdAt",
    label: "Date",
    render(value) {
      return dayjs(value.createdAt).format("DD-MMMM-YYYY HH:mm:ss")
    },
  }, {
    key: "image",
    label: "Image",
    render(value) {
      return value.image ? 'Yes' : 'No'
    }
  }]

export const EVENTLOG_LIST_TABLE_METADATA: DatatableColumn<EventLog>[] = [{
  key: "name",
  label: "Name",
}, {
  key: "propertyId",
  label: "Property Id",
  className: "whitespace-nowrap",
}, {
  key: "unitid",
  label: "Unit id",
  className: "whitespace-nowrap",
  render(value) {
    return value.unitId ? value.unitId : '-'
  },
}, {
  className: "whitespace-nowrap",
  key: "description",
  label: "Description",
  render(value) {
    return truncateString(value.description, 20)
  }
}]
export const INVENTORY_TABLE_METADATA: DatatableColumn<Inventory>[] = [{
  key: "name",
  label: "Name",
}, {
  key: "amount",
  label: "Amount",
}, {
  key: "createdAt",
  label: "Created At",
  render(value) {
    return localDate(value.createdAt)
  }
}]

export const INVENTORY_BY_UNIT_TABLE_METADATA: DatatableColumn<InventoryByUnit>[] = [{
  key: "name",
  label: "Name",
}, {
  key: "amount",
  label: "Amount",
}, {
  key: "createdAt",
  label: "Created At",
  render(value) {
    return localDate(value.createdAt)
  }
}]

export const LOG_TABLE_METADATA: DatatableColumn<Log>[] = [{
  key: "context",
  label: "Context"
}, {
  key: "level",
  label: "Level"
}, {
  key: "message",
  label: "Message",
  render(value) {
    return value.data.message
  }
}, {
  key: "timestamp",
  label: "Timestamp",
  render(value) {
    return localDateWithTime(value.timestamp)
  }
}]

export const PRICE_SUGGESTION_LIST_TABLE_METADATA: DatatableColumn<PriceSuggestion>[] = [{
  key: "time",
  label: "Time",
  render(value) {
    return value.timestamp ? localTimeHM(value.timestamp) : '-'
  },
},
{
  key: "occupancy",
  label: "Occupancy",
  render(value) {
    return value.occupancy !== undefined ? value.occupancy+'%' : '-'
  },
}, {
  key: "price_suggestion",
  label: "Price Suggestion",
  render(value) {
    return rp(value.price)
  }
}]

export const HISTORY_PRICE_LIST_TABLE_METADATA: DatatableColumn<HistoryPrice>[] = [{
  className: "whitespace-nowrap",
  key: "available",
  label: "Available"
}, {
  className: "whitespace-nowrap",
  key: "dailyBooked",
  label: "Daily Booked"
}, {
  className: "whitespace-nowrap",
  key: "monthlyBooked",
  label: "Monthly Booked"
}, {
  className: "whitespace-nowrap",
  key: "modified",
  label: "Close Room"
}, {
  key: "price",
  label: "Price",
  render(value) {
    return rp(value.price)
  },
}, {
  key: "admin",
  label: "Admin",
  render(value) {
    return value.admin ? value.admin.name : '-'
  }
}]

export const MODIFIER_LIST_TABLE_METADATA: DatatableColumn<any>[] = [{
  className: "whitespace-nowrap",
  key: "propertyId",
  label: "Property Id"
}, {
  className: "whitespace-nowrap",
  key: "count",
  label: "Count"
}, {
  className: "whitespace-nowrap",
  key: "startDate",
  label: "Start Date",
  render(value) {
    return localDate(value.startDate)
  }
}, {
  className: "whitespace-nowrap",
  key: "endDate",
  label: "End Date",
  render(value) {
    return localDate(value.endDate)
  }
}, {
  className: "whitespace-nowrap",
  key: "createdAt",
  label: "Created At",
  render(value) {
    return localDate(value.createdAt)
  }
}]

export const BOOKING_FITNESS_LIST_TABLE_METADATA: DatatableColumn<BookingFitness>[] = [{
  className: "whitespace-nowrap",
  key: "customer_id",
  label: "Customer Id"
}, {
  className: 'whitespace-nowrap',
  key: 'platform_fee',
  label: 'Platform Fee',
}, {
  className: "whitespace-nowrap",
  key: "discount",
  label: "Discount",
  render(value) {
    return rp(value.discount)
  }
}, {
  className: "whitespace-nowrap",
  key: "total",
  label: "Total",
  render(value) {
    return rp(value.total)
  }
}]