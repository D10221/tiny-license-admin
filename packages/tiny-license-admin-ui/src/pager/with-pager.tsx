import { Component, ReactNode } from "react";
/** */
export type RenderProps<T> = WithPagerState<T> & {
    next(): any,
    prev(): any,
    setPageSize(n: number): any
}
/** */
export interface WithPagerProps<T> {
    data: T[];
    pageSize: number;
    render(props: RenderProps<T>): ReactNode;
}
/** */
export interface WithPagerState<T> {
    page: number;
    pageStart: number;
    pageEnd: number;
    pageCount: number;
    paged: T[];
    nextPage: number;
    dataSize: number;
    pageSize: number;
    sliceLength: number;
}
export default class WithPager<T> extends Component<WithPagerProps<T>, WithPagerState<T>>{

    state = {
        page: 0,
        paged: [],
        pageStart: 0,
        pageCount: 0,
        pageEnd: 0,
        nextPage: 0,
        dataSize: 0,
        pageSize: this.props.pageSize,
        sliceLength: 0
    }

    static getDerivedStateFromProps(props: WithPagerProps<any>, state: WithPagerState<any>) {
        const { data } = props;
        const { page, pageSize } = state;
        const dataSize = data.length;
        const index = page + 1;
        const pageStart = pageSize * page;
        const pageEnd = pageStart + pageSize;
        const sliced = data.slice(pageStart, pageEnd);
        const nextPage = (dataSize > ((index) * pageSize)) ? (page + 1) : page;
        return {
            page,
            paged: sliced,
            pageStart,
            pageEnd,
            pageSize,
            pageCount: Math.ceil(dataSize / pageSize),
            nextPage,
            dataSize,
            sliceLength: sliced.length,            
        }
    }
    /** */
    prev = () => {
        const { page } = this.state;
        if (page > 0) {
            this.setState({ page: page - 1 });
        }
    }
    /** */
    next = () => {
        const { page, nextPage } = this.state;
        if (page < nextPage) {
            this.setState({ page: nextPage });
        }
    }
    /** */
    setPageSize = (pageSize: number) => {
        // if (!this.props.data || !pageSize || (pageSize >= this.props.data.length)) return;
        this.setState({
            pageSize
        })
    }
    render() {
        return this.props.render({ ...this.state, prev: this.prev, next: this.next, setPageSize: this.setPageSize });
    }
}