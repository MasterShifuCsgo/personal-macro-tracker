# API Documentation

## API standardized result: what can the api send?

Object {
**error** - String - includes error as string
**result** - Object | Array - received data from api
}
Error codes are send as response status codes through received http messages.

both fields are represented in an object.

---

## POST /days

**Purpose:** Create a new day document with the current date and empty foods array.  
**Stability:** Beta  
**Version Introduced:** v1  
**Authentication:** None

---

#### Request

**Headers:**

- _none_

**Query Params:**

- _none_

**Body:** _none_
**Constraints**

- Creates a new row on every invocation. Not idempotent.

#### Responses

| Code | Meaning                | Response Body                                                 |
| ---- | ---------------------- | ------------------------------------------------------------- |
| 201  | Day created            | `{ "result": { /* Day document */ } }`                        |
| 500  | Database write failure | `{ "error": "Database couldn't write new day" }`              |
| 400  | Day already exists     | `{ "error": "Day already with today's date already exists" }` |

**Error Reference**

- `db_write_failed` — storage layer rejected insert.

**Idempotency and Concurrency**

- Idempotency: not supported. Repeated calls create distinct documents.
- Concurrency: N/A (no reads/updates in this handler).

## PUT /days

**Purpose:** Replace the `foods` array of an existing day.  
**Stability:** Beta  
**Version Introduced:** v1  
**Authentication:** None

---

#### Request

**Headers:**

- _none_

**Query Params:**

- `day_id` — string, required, MongoDB ObjectId, regex `^[a-f0-9]{24}$`

**Body Schema:**

`{   "foods": ["<food_id>", "..."] }`

**Constraints**

- `foods`: array of ObjectId strings `^[a-f0-9]{24}$`
- Full replacement semantics: supplied array overwrites `document.foods`.

#### Responses

| Code | Meaning                                                | Response Body              |
| ---- | ------------------------------------------------------ | -------------------------- |
| 204  | Updated                                                | _(empty)_                  |
| 400  | Validation error (schema, missing day, bad references) | `{ "error": "<message>" }` |

**Error Reference**

- `invalid_id_format` — `day_id` fails ObjectId format check.
- `validation_error` — payload fails `DaysTypeCheck` validation.
- `day_not_found` — no document with provided `day_id`.
- `invalid_food_reference` — one or more food IDs do not exist.

**Idempotency and Concurrency**

- Idempotency: implicit for identical `foods` payloads on the same document.
- Concurrency: last-write-wins (no versioning/ETag). Concurrent saves overwrite `foods`.

## GET /days

**Purpose:** Fetch a day by `day_id` or 'date'.  
**Stability:** Beta  
**Version Introduced:** v1  
**Authentication:** None

---

#### Request

**Headers:**

- _none_

**Query Params:**

Either date or day_id have to be sent to API path

- `day_id` — string, MongoDB ObjectId, regex `^[a-f0-9]{24}$`
- `date` — string, date-month-year, example: '24-4-2000' means 24 april, year: 2000

**Body:** _none_

**Constraints**

- `day_id` must pass format validation; invalid yields 400.
- `date` must pass being a string.

#### Responses

| Code | Meaning                      | Response Body                                                                          |
| ---- | ---------------------------- | -------------------------------------------------------------------------------------- |
| 200  | Found                        | `{ "result": { /* Day document */ } }`                                                 |
| 400  | Invalid id or day not found  | `{ "error": "<message>" }`                                                             |
| 400  | day_id and date provided     | `{ "error": "'day_id' or 'date' were not provided." }`                                 |
| 400  | day_id and date not provided | `{ "error": "both 'day_id' and 'date' were provided. Don't know by which to search" }` |

**Error Reference**

- `invalid_id_format` — `day_id` fails ObjectId format check.
- `day_not_found` — no document with provided `day_id`.
- `date_not_string` — no document with provided `day_id`.
- `date_and_day_id_provided` — API recieved date and day_id. doesn't know which one to search with.

**Idempotency and Concurrency**

- Idempotency: safe (read-only).
- Concurrency: N/A (read-only).

## POST /foods

**Purpose:** Create a new food.  
**Stability:** Beta  
**Version Introduced:** v1  
**Authentication:** None

---

#### Request

**Headers:**

- `Content-Type: application/json`

**Query Params:**

- _none_

**Body Schema:**

`{   "food": {     "name": "string",     "...": "other fields accepted by server-side model"   } }`

server-side model:

| Field   | Definition                   |
| ------- | ---------------------------- |
| name    | { type: String, required }   |
| energy  | { type: Number, default: 0 } |
| kcal    | { type: Number, default: 0 } |
| protein | { type: Number, default: 0 } |
| fat     | { type: Number, default: 0 } |
| carb    | { type: Number, default: 0 } |
| fiber   | { type: Number, default: 0 } |
| salt    | { type: Number, default: 0 } |
| serving | { type: Number, default: 0 } |

**Constraints**

- `food` validated by `FoodsTypeCheck`.
- `food.name` must be unique (case-sensitive by implementation).
- Non-whitelisted fields may be ignored or set to `null` by the model.

#### Responses

| Code | Meaning          | Response Body                                          |
| ---- | ---------------- | ------------------------------------------------------ |
| 201  | Created          | _(empty)_                                              |
| 400  | Validation error | `{ "error": "<validation message>" }`                  |
| 400  | Duplicate name   | `{ "error": "Food with similar name already exists" }` |

**Error Reference**

- `validation_error` — request body fails `FoodsTypeCheck`.
- `duplicate_name` — a food with the same or similar name already exists.

**Idempotency and Concurrency**

- Idempotency: not supported. Re-sending the same payload can yield `400 duplicate_name`.
- Concurrency: last-write-wins does not apply (create-only). Concurrent creates with same name race; one succeeds, others receive `400 duplicate_name`.

---

## DELETE /foods

**Purpose:** Delete a food by `food_id`.  
**Stability:** Beta  
**Version Introduced:** v1  
**Authentication:** None

---

#### Request

**Headers:**

- _none_

**Query Params:**

- `food_id` — string, **required**, MongoDB ObjectId, regex `^[a-f0-9]{24}$`

**Body:** _none_

**Constraints**

- `food_id` must pass format validation before deletion.

#### Responses

| Code | Meaning           | Response Body                                      |
| ---- | ----------------- | -------------------------------------------------- |
| 204  | Deleted           | _(empty)_                                          |
| 400  | Invalid id format | `{ "error": "<validation message>" }`              |
| 400  | Food not found    | `{ "error": "food with id '<id>' doesn't exist" }` |

**Error Reference**

- `invalid_id_format` — `food_id` fails ObjectId format check.
- `food_not_found` — no document with provided `food_id`.

**Idempotency and Concurrency**

- Idempotency: effectively idempotent; repeated deletes return `400 food_not_found` after first success.
- Concurrency: delete-vs-update races may cause `food_not_found` for the loser.

---

## PUT /foods

**Purpose:** Replace fields of an existing food.  
**Stability:** Beta  
**Version Introduced:** v1  
**Authentication:** None

---

#### Request

**Headers:**

- `Content-Type: application/json`

**Query Params:**

- `food_id` — string, **required**, MongoDB ObjectId, regex `^[a-f0-9]{24}$`

**Body Schema:**

`{   "food": {     "name": "string",     "...": "fields to overwrite"   } }`

**Constraints**

- `food_id` validated by `FoodsTypeCheck.extract("id")`.
- `food` validated by `FoodsTypeCheck.extract("food")`.
- Full overwrite semantics on provided fields; unspecified fields remain unchanged.
- If updating `name`, uniqueness rules apply (same constraints as create).

#### Responses

| Code | Meaning               | Response Body                                                   |
| ---- | --------------------- | --------------------------------------------------------------- |
| 204  | Updated               | _(empty)_                                                       |
| 400  | Invalid id format     | `{ "error": "<validation message>" }`                           |
| 400  | Body validation error | `{ "error": "<validation message>" }`                           |
| 400  | Food not found        | `{ "error": "provided id does not match an existing food id" }` |

**Error Reference**

- `invalid_id_format` — `food_id` fails ObjectId format check.
- `validation_error` — `food` fails model validation.
- `food_not_found` — no document with provided `food_id`.

**Idempotency and Concurrency**

- Idempotency: idempotent per identical payload on the same `food_id`.
- Concurrency: last-write-wins; no optimistic locking or ETags.

---

## GET /foods

**Purpose:** List all foods.  
**Stability:** Beta  
**Version Introduced:** v1  
**Authentication:** None

---

#### Request

**Headers:**

- _none_

**Query Params:**

- _none_

**Body:** _none_

**Constraints**

- None.

#### Responses

| Code | Meaning        | Response Body                   |
| ---- | -------------- | ------------------------------- |
| 200  | Success        | `{ "result": [ /* foods */ ] }` |
| 400  | No foods exist | `{ "error": "No foods exist" }` |

**Error Reference**

- `no_foods` — collection empty (implementation returns 400 rather than `200 []`).

**Idempotency and Concurrency**

- Idempotency: safe (read-only).
- Concurrency: N/A (read-only).
