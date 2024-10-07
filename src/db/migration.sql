CREATE TABLE public.NcClassification (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(50),
    "order" INTEGER,
    daysToResolve INTEGER
);

CREATE TABLE public.Survey (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    template BOOLEAN NOT NULL,
    name VARCHAR(255) NOT NULL,
    date DATE,
    responsible VARCHAR(255),
    objectName VARCHAR(255),
    objectUrl VARCHAR(255)
);

CREATE TABLE public.Question (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    description VARCHAR(450) NOT NULL,
    status INTEGER NOT NULL,
    responsible VARCHAR(255),
    recurrence BOOLEAN,
    notes VARCHAR(450),
    ncClassificationId UUID,
    correctiveAction VARCHAR(450),
    surveyId UUID,
    "order" INTEGER,
    artifact VARCHAR(255),
    CONSTRAINT fk_ncClassificationId FOREIGN KEY (ncClassificationId) REFERENCES public.NcClassification (id),
    CONSTRAINT fk_surveyId FOREIGN KEY (surveyId) REFERENCES public.Survey (id)
);

CREATE TABLE public.NonConformity (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    questionId UUID NOT NULL,
    finalResolutionDate DATE,
    lastResolutionDate DATE,
    resolved BOOLEAN NOT NULL,
    CONSTRAINT fk_questionId FOREIGN KEY (questionId) REFERENCES public.Question (id)
);

CREATE TABLE public.Escalation (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ncId UUID NOT NULL,
    date DATE NOT NULL,
    escalatedTo VARCHAR(255),
    CONSTRAINT fk_ncId FOREIGN KEY (ncId) REFERENCES public.NonConformity (id)
);
