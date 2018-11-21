export interface PersistTransform {
    onSave?(value: {}):{};
    onLoad?(value: {}):{};
}