from pydantic import BaseModel, ConfigDict, model_validator

class WorkoutSetSubmission(BaseModel):
    lbs: float | None
    reps: int | None


class ExerciseSubmission(BaseModel):
    name: str
    sets: list[WorkoutSetSubmission]


class WorkoutSubmission(BaseModel):
    date: str
    exercises: list[ExerciseSubmission]


class TemplateExerciseCreate(BaseModel):
    name: str
    target_weight: float
    num_sets: int


class TemplateCreate(BaseModel):
    label: str
    focus: str
    exercises: list[TemplateExerciseCreate]


class TemplateExerciseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    target_weight: float
    num_sets: int
    position: int


class TemplateResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    label: str
    focus: str
    exercises: list[TemplateExerciseResponse]

class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str
    confirm_password: str

    @model_validator(mode="after")
    def passwords_match(self) -> "ChangePasswordRequest":
        if self.new_password != self.confirm_password:
            raise ValueError("New password and confirmation do not match")
        return self

class ReusableExerciseCreate(BaseModel):
    name: str
    target_weight: float
    num_sets: int