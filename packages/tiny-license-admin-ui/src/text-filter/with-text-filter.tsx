import { Component, ReactNode, ChangeEvent } from "react";
/** */
export type TextFilterProps<T extends {}> = {
  data: T[];
  render(
    value: string,
    filtered: T[],
    setFilter: (text: string | ChangeEvent) => any
  ): ReactNode;
};
/** */
interface TextFilterState<T> {
  filtered: T[];
  value: string | undefined;
}
/** */
export default class TextFilter<T> extends Component<
  TextFilterProps<T>,
  TextFilterState<T>
> {
  state = {
    filtered: [],
    value: ""
    // typeof this.props.defaultValue === "string" ? this.props.defaultValue : ""
  };
  static getDerivedStateFromProps<T>(
    props: TextFilterProps<T>,
    state: TextFilterState<T>
  ) {
    const { data } = props;
    const { value } = state;
    const filtered = TextFilter.applyFilter(data, value);
    return {
      filtered,
      value
    };
  }
  /** */
  static filter = (regex: RegExp) => {
    /**
     *
     */
    function values(x: {}) {
      return Object.keys(x)
        .map(k => `${x[k]}`)
        .join(" ");
    }
    /** */
    return (x: {}) => {
      return regex.test(values(x));
    };
  };
  /** */
  static applyFilter = <T extends {}>(
    data: T[],
    filterText: string | undefined
  ) => {
    return data.filter(TextFilter.filter(new RegExp(filterText || "")));
  };
  /** */
  setFilter = (e: string | React.ChangeEvent<HTMLInputElement>) => {
    const text =
      typeof e === "string"
        ? e
        : e.target && e.target.value
          ? e.target.value
          : "";
    this.setState({ value: text });
  };
  /** */
  render() {
    const { filtered, value } = this.state;
    return this.props.render(value, filtered, this.setFilter);
  }
}
